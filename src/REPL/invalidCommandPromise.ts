import { REPLFunction } from "./REPLFunction";

/**
 * REPL function to handle the case of unregistered commands.
 * @param args : arguments to the REPL function
 * @returns a Promise that returns a string to be added to the History window.
 */
export const invalidCommandPromise :  REPLFunction = args => {
    return new Promise<string>
        ((resolve, reject) => {
            // This function always send a reject.
            reject('Invalid command.')
        });
}
