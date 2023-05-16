// const { mdLinks } = require("../index.js").default;
import { mdLinks } from '../index.js'
import { directory, markdownFile, isMdFile, existsPath, toAbsolute } from '../api.js';
import chalk from 'chalk';

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

describe('Path tests', () => {
  it('should return true if the path exists', () => {
    expect(existsPath('./file')).toBe(true)
  })

  it('should return false if the path does not exist', () => {
    expect(existsPath('/ale/css/nonexistant.d')).toBe(false)
  })

  it('should return an absolute path', () => {
    expect(toAbsolute('./file/example2.md')).toBe('C:\\Users\\alexa\\OneDrive\\Documents\\School\\Lab\\md-links\\file\\example2.md')
  })


});

describe('Folder tests', () => {
  it('should return true if the path is a directory', () => {
    expect(directory('./file')).toBe(true)
  })

  it('should return false if the path is a file', () => {
    expect(directory('./file/example2.md')).toBe(false)
  })
});

describe('Markdown file tests', () => {
  it('should return true if the path is a MdFile', () => {
    expect(markdownFile('./file/example2.md')).toBe(true)
  })

  it('should return false if the path not a file and not a MdFile', () => {
    expect(isMdFile('./file/test.txt')).toBe(false)
  })
});