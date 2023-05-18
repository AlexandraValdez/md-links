#!/usr/bin/env node

// to indicate that we use this file as a cli script
// const { mdLinks } = require("./index.js").default;
import chalk from "chalk";
import { mdLinks } from "./index.js";
import { getStats } from "./api.js";
import { argv } from "process";

// mdLinks("/ejemplo/noexiste.md")
//   .then(() => {})
//   .catch((error) => {
//     console.log(error);
//   });

const args = argv.slice(2);
const path = "./file/example2.md";
const options = {
  validate: args.includes("--validate"),
  stats: args.includes("--stats"),
};

// if (args.includes('--validate'))
// .then(results => {
//     results.forEach(link => {
//       const { href, text, file } = link;
//       console.log(`Link: ${chalk.blue(href)}`);
//       console.log(`Text: ${text}`);
//       console.log(`File: ${chalk.green(file)}`);  })
// });

// if (args.includes('--stats')) {
//   options.stats = true;
// }

if (args.includes("--help")) {
  console.log("mdLinks - A tool to analyze Markdown files and extract links.");
  console.log("Usage: mdLinks <path> [options]");
  console.log("");
  console.log("Options:");
  console.log("--validate   Validate the status of each link.");
  console.log("--stats      Display statistics about the links.");
  console.log("--help       Display help information.");
} else {
}

export const formatLinkOutput = (link, validate) => {
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
};

mdLinks(path, options)
  .then((results) => {
    if (options.stats) {
      const statsText = getStats(results);
      console.log(statsText);
    } else {
      results.forEach((link) => {
        console.log(formatLinkOutput(link, options.validate));
      });

      // console.log(links);
    }

    results.forEach((link) => {
      const { href, text, file, status, ok } = link;
      console.log(`Link: ${chalk.blue(href)}`);
      console.log(`Text: ${text}`);
      console.log(`File: ${chalk.yellow(file)}`);
      if (options.validate) {
        const statusColor = ok === "ok" ? chalk.green : chalk.red;
        console.log(`Status: ${statusColor(status)}`);
      }
      console.log("----------------------");
    });
  })
  .then((links) => {})
  .catch((error) => {
    console.error(error);
  });
