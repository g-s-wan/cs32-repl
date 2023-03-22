import {REPLFunction} from "../../../main/REPL/REPLFunction";

/**
 * A simple function to test registering non-baseline commands
 * @param args - string that will determine whether the Promise resolves or rejects
 */
export const hugPromise :  REPLFunction = args => {
  return new Promise<string>
  ((resolve, reject) => {
    // If there is no argument, reject
    if (args[0] === undefined) {
      reject("No hug for you. :(");
    } else {
      resolve("Giving you a big hug!");
    }
  }).catch((error) => {
    return error;
  })
}