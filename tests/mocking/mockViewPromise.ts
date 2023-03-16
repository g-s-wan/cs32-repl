import { REPLFunction } from "../../src/REPL/REPLFunction";
import {buildHtmlTable} from "../../src/REPL/csv2Table"
import {mockViewFetch} from "./mockViewFetch";

/**
 * REPL function to call API for viewing a CSV file.
 *
 * @param args : arguments to the REPL function
 * @returns a Promise that returns a string to be added to the History window.
 */
export const mockViewPromise :  REPLFunction = args => {
    return new Promise<string>
    ((resolve, reject) => {
        let extraParam;
        args.length > 1 ? extraParam = "?=" + args[0] : extraParam = ""
        const responseObject = mockViewFetch("http://localhost:3232/viewcsv" + `${extraParam}`);
        if (responseObject.result.includes("error")) {
            reject(`An error occurred while loading the file: ${responseObject.message}`);
        } else {
            if (responseObject.data) {
                resolve("Viewing CSV data <br>" +  buildHtmlTable(responseObject.data));
            }
        }
    })
};