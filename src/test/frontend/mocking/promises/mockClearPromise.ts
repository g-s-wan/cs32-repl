import {mockClearFetch} from "../mockClearFetch";
import {REPLFunction} from "../../../../frontend/REPL/REPLFunction";

/**
 * Mocks a REPL function that calls API for clearing the loaded CSV file.
 *
 * @param args : arguments to the REPL function
 * @returns a Promise that returns a string to be added to the History window.
 */
export const mockClearPromise :  REPLFunction = args => {
  return new Promise<string>
  ((resolve, reject) => {
    // Instead of fetching, grab a mocked JSON
    const responseObject = mockClearFetch("http://localhost:3232/clear");
    if (responseObject.result.includes("error")) {
      reject(`An error occurred while clearing the file: ${responseObject.message}`);
      return;
    } else {
      resolve("Loaded CSV has been cleared.");
    }
  })

};