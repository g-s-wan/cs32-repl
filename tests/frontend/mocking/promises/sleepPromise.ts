import {REPLFunction} from "../../../../src/frontend/REPL/REPLFunction";

/**
 * A simple function that either resolves or rejects depending on the argument passed in
 * @param args - either "AM" or "PM"
 */
export const sleepPromise :  REPLFunction = args => {
  return new Promise<string>
  ((resolve, reject) => {
    // If there are no arguments or if the argument is not "AM" or "PM", reject
    if (args[0] === undefined) {
      reject("Please provide either AM or PM");
    }
    if (args[0] === "PM") {
      resolve("Snoring sounds");
    } else if (args[0] === "AM") {
      resolve("Wide awake!");
    } else {
      reject("Did you provide a real time?");
    }
  }).catch((error) => {
    return error;
  })
}