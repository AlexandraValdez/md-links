// const { mdLinks } = require("../index.js").default;
import { mdLinks } from "../index.js";
import {
  directory,
  markdownFile,
  isMdFile,
  existsPath,
  toAbsolute,
  findLinksInFile,
  dirToFile,
  validateLinks,
} from "../api.js";
import chalk from "chalk";

describe("mdLinks", () => {
  it("should...", () => {
    console.log("FIX ME!");
  });

  // it('should return a promise', () => {
  //   expect(mdLinks()).toBe(typeof Promise);
  // });

  it("should reject when a path does not exist", () => {
    return mdLinks("/ale/css/nonexistant.d").catch((error) => {
      expect(error).toBe(chalk.red("path does not exist"));
    });
  });
});

describe("Path tests", () => {
  it("should return true if the path exists", () => {
    expect(existsPath("./file")).toBe(true);
  });

  it("should return false if the path does not exist", () => {
    expect(existsPath("/ale/css/nonexistant.d")).toBe(false);
  });

  it("should return an absolute path", () => {
    expect(toAbsolute("./file/example2.md")).toBe(
      "C:\\Users\\alexa\\OneDrive\\Documents\\School\\Lab\\md-links\\file\\example2.md"
    );
  });
});

describe("Folder tests", () => {
  it("should return true if the path is a directory", () => {
    expect(directory("./file")).toBe(true);
  });

  it("should return false if the path is a file", () => {
    expect(directory("./file/example2.md")).toBe(false);
  });

  it("dirToFile should return an array of links from all files in the directory", async () => {
    const output = [
      {
        file: "file2\\file3\\test.md",
        href: "http://es.wikipedia.org/wiki/Markdown",
        text: "Markdown",
      },
    ];
    const links = await dirToFile("./file2");
    expect(links).toEqual(output);
  });

  /* it("dirToFile should reject when a folder can't be read", () => {
    return(dirToFile("./file2")).catch((error) => {
      expect(error).toContain('Error processing directory');
    })
  });  */
});

describe("file tests", () => {
  it("findLinksInFile should return an array of links", () => {
    const output = [
      {
        file: "./file2/file3/test.md",
        href: "http://es.wikipedia.org/wiki/Markdown",
        text: "Markdown",
      },
    ];
    return findLinksInFile("./file2/file3/test.md").then((links) => {
      expect(links).toEqual(output);
    });
  });

  it("should reject when a file can't be read", () => {
    return findLinksInFile("./ale/css/nonexistant.md").catch((error) => {
      expect(error).toContain("couldn't be read");
    });
  });
});

describe("Markdown file tests", () => {
  it("should return true if the path is a MdFile", () => {
    expect(markdownFile("./file/example2.md")).toBe(true);
  });

  it("should return false if the path not a file and not a MdFile", () => {
    expect(isMdFile("./file2/test.txt")).toBe(false);
  });
});

describe('validateLinks', () => {
  it('should validate links that work', () => {
    const links = [
      { file: "./file2/file3/test.md", href: 'http://es.wikipedia.org/wiki/Markdown', text: 'Markdow', status: 200, message: 'ok' },
    ];

    return validateLinks(links, { validate: true }).then((result) =>{
      expect(result).toEqual(links);
    });
  });

  it('should skip validation if options.validate is false', async () => {
    const links = "./file2/file3/test.md"
    const options = { validate: false };
    const validatedLinks = await validateLinks("./file2/file3/test.md", options);
    expect(validatedLinks).toBe(links);
  });
});