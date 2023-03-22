import { REPLFunction } from "../REPLFunction";

/**
 * REPL function to call API for loading CSV file.
 * 
 * @param args : arguments to the REPL function
 * @returns a Promise that returns a string to be added to the History window.
 */
export const loadPromise :  REPLFunction = args => {
    return new Promise<string>
        ((resolve, reject) => {
            // If the user has provided a filepath
            if (args.length > 0) {
                const filePath = args[0];

                try {
                  fetch('http://localhost:3232/loadcsv?filepath=' + `${filePath}`)
                    .then(response => response.json())
                    .then(responseObject => {
                      // Reject if the API returned an error
                      if (responseObject.result.includes("error")) {
                        reject(`An error occurred while loading the file: ${responseObject.message}`);
                        return;
                      } else {
                        resolve(`Successfully loaded ${filePath}`);
                      }
                  })
                  .catch((error) => {
                    reject("Network error is encountered. Check your network connection, server is running, or permissions issues: " + error);
                    return;
                  });
                } catch (ex: any) {
                  reject(ex.message);
                  return;
                }
            // If there are no arguments, the user forgot to provide a filepath
            }  else {
                reject("Please include a filepath when using the load_file command.");
                return;
            }

        });
}
