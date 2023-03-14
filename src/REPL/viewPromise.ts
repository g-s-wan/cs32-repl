import { REPLFunction } from "./REPLFunction";
import { history } from "./History";

/**
 * REPL function to call API for viewing a CSV file.
 * 
 * @param args : arguments to the REPL function
 * @returns a Promise that returns a string to be added to the History window.
 */
export const viewPromise :  REPLFunction = args => {
    return new Promise<string>
        ((resolve, reject) => {

            fetch("http://localhost:3232/viewcsv")
            .then(response => response.json())
            .then(responseObject => {
                if (responseObject.result.includes("error")) {
                    reject(`An error occurred while viewing the file: ${responseObject.message}`);
                  return;
                } else {

                history.addTable(responseObject.data);

                resolve("Viewing CSV data");
            }})
            .catch((error) => {
                reject(error);
                return;
            });

            })

        };
