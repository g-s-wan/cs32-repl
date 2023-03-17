import {REPLFunction} from "../../../src/REPL/REPLFunction";

export const sleepPromise :  REPLFunction = args => {
  return new Promise<string>
  ((resolve, reject) => {
    if (args[0] === undefined) {
      reject("Please provide either AM or PM");
    }
    if (args[0] === "PM") {
      reject("Snoring sounds");
    } else if (args[0] === "AM") {
      resolve("Wide awake!");
    } else {
      reject("Did you provide a real time?");
    }
  }).catch((error) => {
    return error;
  })
}