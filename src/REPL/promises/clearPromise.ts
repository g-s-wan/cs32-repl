import { REPLFunction } from "../REPLFunction";

/**
 * REPL function to call API for viewing a CSV file.
 *
 * @param args : arguments to the REPL function
 * @returns a Promise that returns a string to be added to the History window.
 */
export const clearPromise :  REPLFunction = args => {
  return new Promise<string>
  ((resolve, reject) => {

    fetch("http://localhost:3232/clear")
    .then(response => response.json())
    .then(responseObject => {
      if (responseObject.result.includes("error")) {
        reject(`An error occurred while clearing the loaded CSV file from cache.`);
        return;
      } else {
        resolve("Loaded CSV has been cleared.");
      }})
    .catch((error) => {
      reject(error);
      return;
    });

  })

};