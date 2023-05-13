import { existsSync, statSync, readFile, readdir } from "fs";
import { isAbsolute, resolve, extname, join } from "path";
import fetch from "node-fetch";
import chalk from "chalk";

export const existsPath = (path) => existsSync(path);

export const toAbsolute = (path) => {
  return isAbsolute(path) ? path : resolve(path);
};

// verifica si es un directorio
export const directory = (absolutePath) => statSync(absolutePath).isDirectory();

// lee contenido dentro de un directorio returns an array of filenames present in that directory.
// export const toFile = (absolutePath, callback) => readdirSync(absolutePath, callback);

// to check if its a md file
export const markdownFile = (path) => extname(path) === ".md";

export const joinPath = (absolute, file) => join(absolute, file);

export const findLinksInFile = (absolute) => {
  // hay que hacer una promesa porque retornamos un valor
  return new Promise((resolve, reject) => {
    // tenemos que leer el archivo md
    readFile(absolute, "utf-8", (err, fileContent) => {
      if (err) {
        reject(err);
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
  return new Promise((resolve, reject) => {
    readdir(dirPath, (err, files) => {
      if (err) {
        reject(err);
        return;
      }

      const filePromises = files.map((file) => {
        const filePath = join(dirPath, file);
        return isMdFile(filePath)
          ? findLinksInFile(filePath)
          : dirToFile(filePath);
      });

      Promise.all(filePromises)
        .then((results) => {
          resolve(results.flat());
        })
        .catch((error) => reject(error));
    });
  });
};

export const validateLinks = (links, options) => {
  return new Promise((resolve, reject) => {
    if (options.validate) {
      const linkPromises = links.map((link) => {
        return fetch(link.href)
          .then((response) => {
            link.status = response.status;
            link.ok = response.ok ? "ok" : "fail";
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
