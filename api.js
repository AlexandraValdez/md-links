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

// lee contenido dentro de un directorio returns an array of filenames present in that directory.
// export const toFile = (absolutePath, callback) => readdirSync(absolutePath, callback);
// recursividad para que lea los archivos
export const dirToFile = (dirPath) => {
  const files = readdirSync(dirPath);
  const filePromises = files.map((file) => {
    const filePath = join(dirPath, file);
    return isMdFile(filePath) ? findLinksInFile(filePath) : dirToFile(filePath);
  });

  return Promise.all(filePromises)
    .then((results) => results.flat())
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
            link.ok = "fail";
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

const countUniqueLinks = (links) => {
  // set object to store href values of each link
  const uniqueLinks = new Set(links.map((link) => link.href));
  // size property to know the # of elements in the set
  return uniqueLinks.size;
};

const countBrokenLinks = (links) => {
  // filter to create a new array with fail messages
  const brokenLinks = links.filter((link) => link.ok === "fail");
  return brokenLinks.length;
};

export const getStats = (links) => {
  const total = links.length;
  const unique = countUniqueLinks(links);
  const broken = countBrokenLinks(links);
  const statsText = `
  Total: ${total}\n
  Unique: ${unique}\n
  Broken: ${broken}`;

  return statsText;
};
