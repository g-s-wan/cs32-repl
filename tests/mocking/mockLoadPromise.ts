import { REPLFunction } from "../../src/REPL/REPLFunction";
import {mockLoadFetch, loadResponse } from "./mockLoadFetch"

/**
 * REPL function to call API for loading CSV file.
 *
 * @param args : arguments to the REPL function
 * @returns a Promise that returns a string to be added to the History window.
 */
export const mockLoadPromise :  REPLFunction = args => {
  return new Promise<string>
  ((resolve, reject) => {
    if (args.length > 0) {
      const filePath = args[0];

      const responseObject: loadResponse = mockLoadFetch(`http://localhost:3232/loadcsv?filepath=` + `${filePath}`);
      if (responseObject.result.includes("error")) {
        reject(`An error occurred while loading the file: ${responseObject.message}`);
      } else {
        resolve(`Successfully loaded ${filePath}`);
      }
  } else {
      reject("Please include a filepath when using the load_file command.");
      return;
    }
  });
}