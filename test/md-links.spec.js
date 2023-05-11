// const { mdLinks } = require("../index.js").default;
import { mdLinks } from '../index.js'

describe("mdLinks", () => {
  it("should...", () => {
    console.log("FIX ME!");
  });

  // it('should return a promise', () => {
  //   expect(mdLinks()).toBe(typeof Promise);
  // });

  it("should reject when a path does not exist", () => {
    return mdLinks("/ale/css/nonexistant.d").catch((error) => {
      expect(error).toBe("path does not exist");
    });
  });
});
