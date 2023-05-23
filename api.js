import { existsSync, statSync, readFile, readdirSync } from "fs";
import { isAbsolute, resolve, extname, join } from "path";
import fetch from "node-fetch";
import chalk from "chalk";

// const red = chalk.bold.bgRed;

export const existsPath = (path) => existsSync(path);

export const toAbsolute = (path) => {
  return isAbsolute(path) ? path : resolve(path);
};

// verifica si es un directorio. statSync returns information about a path
export const directory = (absolutePath) => statSync(absolutePath).isDirectory();

// to check if its a md file
export const markdownFile = (path) => extname(path) === ".md";

export const joinPath = (absolute, file) => join(absolute, file);

export const findLinksInFile = (absolute) => {
  // hay que hacer una promesa porque retornamos un valor
  return new Promise((resolve, reject) => {
    // tenemos que leer el archivo md
    readFile(absolute, "utf-8", (error, fileContent) => {
      if (error) {
        reject(chalk.red(`${error} , ${fileContent} couldn't be read `));
        return;
      }
      // jorge: /https:\/\/[^\s]+/g
      const linkRegex = /\[([^\]]+)\]\(([^\)]+)\)/g;
      const fileLinks = [];
      // hacemos match con el metodo matchAll()
      const matches = fileContent.matchAll(linkRegex);
      // llenamos el objeto con las propiedades usando for de los matches
      for (const match of matches) {
        const text = match[1];
        const href = match[2];
        const link = {
          href,
          text,
          file: absolute,
        };
        fileLinks.push(link); // los metemos al array links
      }

      resolve(fileLinks);
    });
  });
};

export const isMdFile = (filePath) => {
  return statSync(filePath).isFile() && markdownFile(filePath);
};

export const dirToFile = (dirPath) => {
  const files = readdirSync(dirPath);

  const filePromises = files.map((file) => {
    const filePath = join(dirPath, file);

    if (isMdFile(filePath)) {
      return findLinksInFile(filePath);
    }

    if (directory(filePath)) {
      return dirToFile(filePath);
    }

    return [];
  });

  return Promise.all(filePromises)
    .then((results) => results.flat()) // flat para obtener un solo array con todos los links del dir
    .catch((error) => {
      throw new Error(`Error processing directory: ${dirPath}\n${error}`);
    });
};

export const validateLinks = (links, options) => {
  return new Promise((resolve, reject) => {
    if (options.validate) {
      const linkPromises = links.map((link) => {
        return fetch(link.href)
          .then((response) => {
            link.status = response.status;
            link.message = response.ok ? "ok" : "fail";

            return link;
          })
          .catch(() => {
            link.status = "N/A";
            link.message = "fail";
            return link;
          });
      });

      Promise.all(linkPromises)
        .then((validatedLinks) => resolve(validatedLinks))
        .catch((error) => reject(error));
    } else {
      resolve(links);
    }
  });
};

let contador = 0;

const countUniqueLinks = (links) => {
  try {
    console.log({ contador });
    contador++;
    console.log("Type of links:", typeof links);
    console.log("Value of links", links);
    console.log("-------------------------------------------");

    if (typeof links === "object" || typeof links === "array") {
      // set object to store href values of each link
      const uniqueLinks = new Set(links.map((link) => link.href));
      // size property to know the # of elements in the set
      return uniqueLinks.size;
    }
    throw new Error("Error en tipo");
  } catch (error) {
    const e = new Error();
    const regex = /\((.*):(\d+):(\d+)\)$/;
    const match = regex.exec(e.stack.split("\n")[2]);
    const objError = {
      filepath: match[1],
      line: match[2],
      column: match[3],
    };
    console.log({ objError });
    console.log("Error countUniqueLinks: ", error);
  }
};

const countBrokenLinks = (links) => {
  // filter to create a new array with fail messages
  const brokenLinks = links.filter((link) => link.message === "fail");
  return brokenLinks.length;
};

export const getStats = (links) => {
  console.log("getStats", links);
  const total = links.length;
  const unique = countUniqueLinks(links);
  const statsText = `
    ${chalk.bgBlue.white(" Total ")}: ${total}\n
    ${chalk.bgGreen.white(" Unique ")}: ${unique}\n
  `;

  return statsText;
};

export const statsValidate = (links) => {
  const total = links.length;
  const unique = countUniqueLinks(links);
  const broken = countBrokenLinks(links);
  const statsText = `
  ${chalk.bgBlue.white(" Total ")}: ${total}\n
  ${chalk.bgGreen.white(" Unique ")}: ${unique}\n
  ${chalk.bgRed.white(" Broken ")}: ${broken}`;

  return statsText;
};

export const formatLinkOutput = (link, validate) => {
  let output = `${chalk.grey.bold(link.file)} ${chalk.cyan(link.href)}`;
  if (validate) {
    output += ` ${
      link.message === "ok"
        ? chalk.bgGreen.bold(" OK ✔ ")
        : chalk.bgRed.bold(" FAIL ✖ ")
    }`;
    output += ` ${chalk.white(link.text)}`;
  }
  /* if (link.text.length > 50) {
    output += ` 
    ${chalk.gray(link.text.slice(0, 50) + "...")}\n
    ${chalk.bgGreen.white(link.href)}: ${unique}`;
  } else {
    ;
  } */
  return output;
};
