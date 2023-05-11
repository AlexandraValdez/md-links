import { existsSync, readdirSync, statSync } from 'fs';
import { isAbsolute, resolve, extname } from 'path';

export const existsPath = (path) => existsSync(path);

export const toAbsolute = (path) => {
    return (isAbsolute(path)) ? path : resolve(path);
}

// verifica si es un directorio 
export const directory = (absolutePath) => statSync(absolutePath).isDirectory();

// lee archivos dentro de un directorio returns an array of filenames present in that directory.
export const toFile = (absolutePath) => {
    return readdirSync(absolutePath, "utf-8");
}

// to check if its a md file
export const markdownFile = (path) => extname(path) === ".md";




