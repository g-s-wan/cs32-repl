import { REPLFunction } from "../../../main/REPL/REPLFunction";
import {mockLoadFetch, loadResponse } from "../mockLoadFetch"

/**
 * Mocks a REPL function that calls API for loading a CSV file.
 *
 * @param args : arguments to the REPL function
 * @returns a Promise that returns a string to be added to the History window.
 */
export const mockLoadPromise :  REPLFunction = args => {
  return new Promise<string>
  ((resolve, reject) => {
    // If there is an argument, it's (probably) the filepath
    if (args.length > 0) {
      const filePath = args[0];

      // Instead of fetching, grab a mocked JSON
      const responseObject: loadResponse = mockLoadFetch(`http://localhost:3232/loadcsv?filepath=` + `${filePath}`);
      if (responseObject.result.includes("error")) {
        reject(`An error occurred while loading the file: ${responseObject.message}`);
      } else {
        resolve(`Successfully loaded ${filePath}`);
      }
  } else {
      // Need a filepath to load a file
      reject("Please include a filepath when using the load_file command.");
      return;
    }
  });
}