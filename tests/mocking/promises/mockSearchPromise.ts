import {REPLFunction} from "../../../src/REPL/REPLFunction";
import {buildHtmlTable} from "../../../src/REPL/csv2Table";
import {mockSearchFetch} from "../mockSearchFetch";

export const mockSearchPromise :  REPLFunction = args => {
  return new Promise<string>
  ((resolve, reject) => {
    if (args.length >= 2) {
      let searchTerm;
      let hasHeaders;
      args.length === 2 ? searchTerm = args[0] : searchTerm = args[1];
      args.length === 2 ? hasHeaders = args[1] : hasHeaders = args[2];
      let responseObject;
      args.length === 3
          ? responseObject = mockSearchFetch("http://localhost:3232/searchcsv" + "?searchterm=" + `${searchTerm}` + "&hasheaders=" + `${hasHeaders}` + "&col=" + `${args[0]}`)
          : responseObject = mockSearchFetch("http://localhost:3232/searchcsv" + "?searchterm=" + `${searchTerm}` + "&hasheaders=" + `${hasHeaders}`)
      console.log("AAAAAAAH");
      console.log(responseObject);
      if (responseObject.result.includes("error")) {
        reject(`An error occurred while searching the file: ${responseObject.message}`);
        return;
      } else {
        const csvData = responseObject.data;
        if (csvData && csvData.length === 0) {
          resolve('No results found');
        } else if (csvData) {
          resolve("Showing search results <br>" + buildHtmlTable(csvData));
        }
      }
    } else {
      reject("Incorrect number of parameters.");
      return;
    }

  });
}