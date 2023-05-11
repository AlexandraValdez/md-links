const { mdLinks } = require("./index.js").default;

mdLinks("/ejemplo/noexiste.md")
  .then(() => {})
  .catch((error) => {
    console.log(error);
  });
