import {REPLFunction} from "../../../../src/frontend/REPL/REPLFunction";
import {buildHtmlTable} from "../../../../src/frontend/REPL/csv2Table";
import {mockSearchFetch} from "../mockSearchFetch";

/**
 * Mocks a REPL function that calls API for searching
 *
 * @param args : arguments to the REPL function
 * @returns a Promise that returns a string to be added to the History window.
 */
export const mockSearchPromise :  REPLFunction = args => {
  return new Promise<string>
  ((resolve, reject) => {
    if (args.length >= 2) {
      let searchTerm;
      let hasHeaders;
      // Same checks and processing as searchPromise
      args.length === 2 ? searchTerm = args[0] : searchTerm = args[1];
      args.length === 2 ? hasHeaders = args[1] : hasHeaders = args[2];
      if (!(hasHeaders === "y") && !(hasHeaders === "n")) {
        reject("Please double check your parameters. The last argument should be either 'y' or 'n' depending on whether your file has headers.");
      }
      let responseObject;
      // Instead of fetching, grab a mocked JSON
      args.length === 3
          ? responseObject = mockSearchFetch("http://localhost:3232/searchcsv" + "?searchterm=" + `${searchTerm}` + "&hasheaders=" + `${hasHeaders}` + "&col=" + `${args[0]}`)
          : responseObject = mockSearchFetch("http://localhost:3232/searchcsv" + "?searchterm=" + `${searchTerm}` + "&hasheaders=" + `${hasHeaders}`)
      if (responseObject.result.includes("error")) {
        // Reject if the API returned an error
        reject(`An error occurred while searching the file: ${responseObject.message}`);
        return;
      } else {
        const csvData = responseObject.data;
        if (csvData && csvData.length === 0) {
          resolve('No results found');
        } else if (csvData) {
          // Show results as a table
          resolve("Showing search results <br>" + buildHtmlTable(csvData));
        }
      }
    } else {
      // If the user provided either one or no arguments
      reject("Incorrect number of parameters.");
      return;
    }

  });
}