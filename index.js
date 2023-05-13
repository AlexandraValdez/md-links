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
} from "./api.js";

export const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    // indetifica si la ruta exista
    if (!existsPath(path)) {
      reject("path does not exist"); // si no existe la ruta rechaza la promesa
      return;
    }
    const absolute = toAbsolute(path); // es absoluto? volver de relativo a absoluto
    if (!directory(absolute)) {
      findLinksInFile(absolute).then((links) => {
        resolve(links);
      });
      return;
    }
    const linksPromise = isMdFile(absolute)
      ? findLinksInFile(absolute)
      : dirToFile(absolute);

    linksPromise
      .then((links) => validateLinks(links, options))
      .then((results) => resolve(results))
      .catch((error) => reject(error));

    // let links = [];
    // const files = toFile(absolute); // recorrer archivo (no hace recursividad) [archivos]
    // const mdFiles = files.filter((file) => markdownFile(file)); // es md? [markdowns] meterlo en array
    // const fileLinksPromises = [];
    // mdFiles.forEach((file) => {
    //   const newPath = joinPath(absolute, file); // unir la ruta con el archivo ex.md/pruebas.js --> nueva ruta
    //   const fileLinksPromise = findLinksInFile(newPath); // hay links? match con regular expressions llenar objeto con propiedades
    //   fileLinksPromises.push(fileLinksPromise);

    //links = resolve(fileLinksPromise)
    //resolve(links.concat(fileLinksPromises));  concatebamos todo al array links
    //   Promise.all(fileLinksPromises)
    //     .then((results) => {
    //       links = results.flat();
    //       resolve(links);
    //     })
    //     .catch((error) => reject(error));
    // });
    // promise.all
    // armar el array del link

    // console.log('despues del forEach');
    // resolve(links);
    //if (options.validate) {}
    // options - value - true or false
  });
};

mdLinks("./pruebas2", { validate: true }).then((result) => {
  console.log(result);
});

// fs.readFile('./example.md', { encoding: 'utf-8'})
// .then(md => {
//   console.log(md)
// })
