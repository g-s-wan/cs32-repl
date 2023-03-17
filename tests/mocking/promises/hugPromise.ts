import {REPLFunction} from "../../../src/REPL/REPLFunction";

export const hugPromise :  REPLFunction = args => {
  return new Promise<string>
  ((resolve, reject) => {
    if (args[0]) {
      resolve("Giving you a big hug!");
    } else {
      reject("No hug for you. :(");
    }
  });
}