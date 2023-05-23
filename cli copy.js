#!/usr/bin/env node

/* function d() {
  if (args.includes("--help")) {
    console.log("mdLinks - A tool to analyze Markdown files and extract links.");
    console.log("Usage: mdLinks <path> [options]");
    console.log("");
    console.log("Options:");
    console.log("--validate   Validate the status of each link.");
    console.log("--stats      Display statistics about the links.");
    console.log("--help       Display help information.");
  }

  if (options.stats) {
    mdLinks(path, options)
      .then((results) => {
        const statsText = getStats(results);
        console.log(statsText);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (options.validate) {
    mdLinks(path, options)
      .then((results) => {
        results.forEach((link) => {
          console.log(formatLinkOutput(link, options.validate));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (options.stats && options.validate) {
    mdLinks(path, options)
      .then((results) => {
        const statsValidateText = statsValidate(results);
        console.log(statsValidateText);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

d(); */


// to indicate that we use this file as a cli script
// const { mdLinks } = require("./index.js").default;
/* import chalk from "chalk";
import { mdLinks } from "./index.js";
import { getStats, validateLinks } from "./api.js";
import { argv } from 'process'; */

// if (!Array.isArray(links)) {
//   return 0;
// }

// mdLinks("/ejemplo/noexiste.md")
//   .then(() => {})
//   .catch((error) => {
//     console.log(error);
//   });

/* const args = argv.slice(2);
const path = './file/example2.md';
const options = {
  validate: args.includes("--validate"),
  stats: args.includes("--stats"),
}; */

// if (args.includes('--validate')) {
//   options.validate = true;
// }

// if (args.includes('--stats')) {
//   options.stats = true;
// }
/* export const getStats = (links) => {
  const total = links.length;
  const unique = countUniqueLinks(links);
  const broken = countBrokenLinks(links);
  const statsText = `
  ${chalk.bgBlue.white(" Total ")}: ${total}\n
  ${chalk.bgGreen.white(" Unique ")}: ${unique}\n
  ${chalk.bgRed.white(" Broken ")}: ${broken}`;

  return statsText;
};
 */
/* mdLinks(path, options)
  .then((results) => {
    if (options.stats) {
      console.log(getStats(results));
    } else {
      results.forEach((link) => {
      //console.log(formatLinkOutput(link, options.validate));
      console.log(printLinks(results));
      let output = `${chalk.cyan(link.file)} ${chalk.green(link.href)} ${chalk.bgYellow.black(
          link.ok
        )}`;
        if (link.text) {
          output += ` ${chalk.gray(link.text)}`;
        }
        console.log(output);
      });
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  }); */

/* export const formatLinkOutput = (link, validate) => {
  let output = `${link.file} ${link.href}`;
  if (validate) {
    output += ` ${link.ok === "ok" ? chalk.green("✔") : chalk.red("✖")}`;
  }
  if (link.text.length > 50) {
    output += ` 
    ${chalk.gray(link.text.slice(0, 50) + "...")}\n
    ${chalk.bgGreen.white(link.href)}: ${unique}`;
  } else {
    output += ` ${chalk.blue(link.text)}`;
  }
  return output;
}; */

/* const printLinks = (links) => {
  links.forEach((link) => {
    const { href, text, file } = link;

    const styledHref = chalk.cyan(href);
    const styledText = chalk.bold.yellow(text);
    const styledFile = chalk.grey(file);

    console.log(`${styledHref}/n ${styledText} ${styledFile}`);
  });
}; */

// mdLinks("./file/example2.md", { validate: false })
// .then((result) => {
// results.forEach((link) => {
//  const { href, text, file, status, ok } = link;
  // console.log(`Link: ${chalk.blue(href)}`);
  // console.log(`Text: ${chalk.magenta(text)}`);
  // console.log(`File: ${chalk.yellow(file)}`);
//  if (options.validate) {
    // console.log(`Status: ${chalk.yellow(status)}`);
    // 
    // const statusColor = ok === "ok" ? chalk.green : chalk.red;
    // console.log(`Status: ${statusColor(status)}`);
//   console.log(result);
// });
