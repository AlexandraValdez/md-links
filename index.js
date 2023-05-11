// import route from 'color-convert/route';
// import api from './api';
import {existsPath, toAbsolute, directory, toFile, markdownFile} from './api.js';

// const { existsPath, toAbsolute } = require("./api.js");
const example = './pruebas';
export const mdLinks = (path) => {
  return new Promise((resolve, reject)=>{
   // indetifica si la ruta exista
  if(!existsPath(path)){
    // si no existe la ruta rechaza la promesa
    reject('path does not exist');
    return;
   }
    // es absoluto? volver de relativo a absoluto
  const absolute = toAbsolute(path);
  if (directory(absolute)){
    // es archivo? recorrer archivo (recursividad)
    // es md?
    const files = toFile(absolute);
    const mdFiles = files.filter(file => markdownFile(file))
    resolve(mdFiles)
    return;
  }

   
   // hay links regressive expressions
   // llenar objeto con propiedades 
   // options - value - true or false
  });
}

mdLinks(example).then((result) => {
  console.log(result)
});

// fs.readFile('./example.md', { encoding: 'utf-8'})
// .then(md => {
//   console.log(md)
// })
