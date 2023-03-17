import { REPLFunction } from "../REPLFunction";
import {buildHtmlTable} from "../csv2Table"
/**
 * Mocks a REPL function that calls API for viewing a CSV file.
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
                // Reject if the API returned an error
                if (responseObject.result.includes("error")) {
                    reject(`An error occurred while viewing the file: ${responseObject.message}`);
                    return;
                    // Empty CSV
                } else if (responseObject.data[0] === undefined) {
                    resolve("The CSV is empty.");
                    return;
                } else {
                // Return CSV contents as a table
                resolve("Viewing CSV data <br>" +  buildHtmlTable(responseObject.data));
            }})
            .catch((error) => {
                reject(error);
                return;
            });

            })

        };
