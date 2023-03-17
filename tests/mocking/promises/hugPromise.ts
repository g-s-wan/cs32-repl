import {REPLFunction} from "../../../src/REPL/REPLFunction";

export const hugPromise :  REPLFunction = args => {
  return new Promise<string>
  ((resolve, reject) => {
    if (args[0] === undefined) {
      reject("No hug for you. :(");
    } else {
      resolve("Giving you a big hug!");
    }
  }).catch((error) => {
    return error;
  })
}