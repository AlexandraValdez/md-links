
// lee contenido dentro de un directorio returns an array of filenames present in that directory.
// export const toFile = (absolutePath, callback) => readdirSync(absolutePath, callback);
// recursividad para que lea los archivos
/* export const dirToFile = (dirPath) => {
  const files = readdirSync(dirPath);
  const filePromises = files.map((file) => {
    const filePath = join(dirPath, file);
    return isMdFile(filePath) ? findLinksInFile(filePath) : dirToFile(filePath);
  });

  return Promise.all(filePromises)
    .then((results) => Array.prototype.concat(...results))
    .catch((error) => {
      throw new Error(`Error processing directory: ${dirPath}\n${error}`);
    });
}; */