import { REPLFunction } from "../REPLFunction";

export let modeBrief : boolean = true;

/**
 * REPL function to change the display mode
 * 
 * @param args : arguments to the REPL function
 * @returns a Promise that returns a string to be added to the History window.
 */

export const modePromise :  REPLFunction = args => {
    return new Promise<string>
        ((resolve, reject) => {
            // Allows the user to "force" a mode with an argument
            if (args.length > 0) {
                if (args[0].toLowerCase() === "brief") {
                    modeBrief = true;

                } else if (args[0].toLowerCase() === "verbose") {
                    modeBrief = false;
                // Only accepts case-insensitive "brief" or "verbose" as arguments
                } else {
                    reject("Invalid mode option.");
                    return;
                }

            // If the user does not specify the desired mode, then toggle the current value
            }  else {
                modeBrief = !modeBrief;
            }

            resolve("Mode successfully set to " + (modeBrief? "BRIEF": "VERBOSE"))
        });
}


