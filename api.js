import { existsSync, readdirSync, statSync, readFile } from 'fs';
import { isAbsolute, resolve, extname, join } from 'path';

export const existsPath = (path) => existsSync(path);

export const toAbsolute = (path) => {
    return (isAbsolute(path)) ? path : resolve(path);
}

// verifica si es un directorio 
export const directory = (absolutePath) => statSync(absolutePath).isDirectory();

// lee contenido dentro de un directorio returns an array of filenames present in that directory.
export const toFile = (absolutePath) => readdirSync(absolutePath);


// to check if its a md file
export const markdownFile = (path) => extname(path) === ".md";



export const joinPath = (absolute, file) => join(absolute, file)


export const findLinksInFile = (absolute) => {
    // hay que hacer una promesa porque retornamos un valor 
    return new Promise((resolve, reject) => {
      // tenemos que leer el archivo md
        readFile(absolute, 'utf-8', (err, fileContent) => {
        if (err) {
          reject(err);
          return;
        }
        // jorge: /https:\/\/[^\s]+/g
        const linkRegex = /\[([^\]]+)\]\(([^\)]+)\)/g;
        const links = [];
        // hacemos match con el metodo matchAll()
        const matches = fileContent.matchAll(linkRegex);
        // llenamos el objeto con las propiedades usando for de los matches
        for (const match of matches) {
          const text = match[1];
          const href = match[2];
          const link = {
            href,
            text,
            file: absolute
          };
          links.push(link); // los metemos al array links
        }
  
        resolve(links);
      });
    });
  };
