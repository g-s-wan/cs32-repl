import { REPLFunction } from "../REPLFunction";
import {buildHtmlTable} from "../csv2Table"
/**
 * REPL function to call API for viewing a CSV file.
 * 
 * @param args : arguments to the REPL function
 * @returns a Promise that returns a string to be added to the History window.
 */
export const viewPromise :  REPLFunction = args => {
    return new Promise<string>
        ((resolve, reject) => {

<<<<<<< HEAD:src/REPL/promises/viewPromise.ts
            try {
                fetch("http://localhost:3232/viewcsv")
                .then(response => response.json())
                .then(responseObject => {
                    if (responseObject.result.includes("error")) {
                        reject(`An error occurred while viewing the file: ${responseObject.message}`);
                    return;
                    } else {

                    resolve("Viewing CSV data <br>" +  buildHtmlTable(responseObject.data));
                }})
                .catch((error) => {
                    reject(error);
                    return;
                });
            } catch (ex: any) {
                reject(ex.message);
=======
            fetch("http://localhost:3232/viewcsv")
            .then(response => response.json())
            .then(responseObject => {
                // Reject if the API returned an error
                if (responseObject.result.includes("error")) {
                    reject(`An error occurred while viewing the file: ${responseObject.message}`);
                  return;
                } else {
                // Return CSV contents as a table
                resolve("Viewing CSV data <br>" +  buildHtmlTable(responseObject.data));
            }})
            .catch((error) => {
                reject(error);
>>>>>>> 4685c22c85229a34ac611d6ab45b5a82f69b4140:src/frontend/REPL/promises/viewPromise.ts
                return;
            }
            })
   

        };
