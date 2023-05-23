// import route from 'color-convert/route';
import {
  existsPath,
  // joinPath,
  toAbsolute,
  directory,
  isMdFile,
  // toFile,
  // markdownFile,
  findLinksInFile,
  dirToFile,
  validateLinks,
  getStats,
  // validateLinks,
} from "./api.js";

import chalk from "chalk";

export const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    // indetifica si la ruta exista
    if (!existsPath(path)) {
      reject(chalk.red("path does not exist")); // si no existe la ruta rechaza la promesa
      return;
    }
    const absolute = toAbsolute(path); // es absoluto? volver de relativo a absoluto
    // if (!directory(absolute)) {
    //   findLinksInFile(absolute);
    //   return;
    // }
    const linksPromise = isMdFile(absolute)
      ? findLinksInFile(absolute)
      : dirToFile(absolute);

    linksPromise
      .then((links) => {
        if (options.validate) {
          return validateLinks(links, options);
        }
        return links;
      })
      .then((results) => {
        if (options.stats) {
          resolve(getStats(results));
        } else {
          resolve(results);
        }
      })
      .catch((error) => reject(error));
  });
};

// mdLinks("./file/example2.md", { validate: true })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// fs.readFile("./file/example2.md" "./file", { encoding: 'utf-8'})
// .then(md => {
//   console.log(md)
// })
