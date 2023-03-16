import {mockClearFetch} from "../../../tests/mocking/mockClearFetch";
import {REPLFunction} from "../../../src/REPL/REPLFunction";

/**
 * REPL function to call API for clearing the loaded CSV file.
 *
 * @param args : arguments to the REPL function
 * @returns a Promise that...
 */
export const mockClearPromise :  REPLFunction = args => {
  return new Promise<string>
  ((resolve, reject) => {
    const responseObject = mockClearFetch("http://localhost:3232/clear");
    if (responseObject.result.includes("error")) {
      reject(`An error occurred while clearing the file: ${responseObject.message}`);
      return;
    } else {
      resolve("Loaded CSV has been cleared.");
    }
  })

};