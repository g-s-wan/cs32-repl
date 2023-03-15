
import { REPLFunction } from "./REPLFunction";
import { buildHtmlTable} from "./csv2Table";

/**
 * REPL function to call API for searching for a string in the CSV file.
 * 
 * @param args : arguments to the REPL function
 * @returns a Promise that returns a string to be added to the History window.
 */

export const searchPromise :  REPLFunction = args => {
    return new Promise<string>
        ((resolve, reject) => {

            if (args.length >= 2) {
                const searchTerm = args[0];
                const hasHeaders = args[1];
                fetch(args.length === 3
                    ? "http://localhost:3232/searchcsv?searchterm=" + `${searchTerm}` + "&hasheaders=" + `${hasHeaders}` + "&col=" + `${args[2]}`
                    : "http://localhost:3232/searchcsv?searchterm=" + `${searchTerm}` + "&hasheaders=" + `${hasHeaders}`
                )
                .then(response => response.json())
                .then(responseObject => {
                    if (responseObject.result.includes("error")) {
                        reject(`An error occurred while searching the file: ${responseObject.message}`);
                        return;
                      } else {
                        const csvData= responseObject.data;
                        if (csvData.length === 0) {
                          resolve('No results found');
                        } else {
                          resolve("Showing search results <br>"+  buildHtmlTable(responseObject.data));
                        }
                      }
                })
                .catch((error) => {
                  reject(error);
                  return;
                });

            }  else {
                reject("Insufficient number of parameters");
                return;
            }

        });
}
