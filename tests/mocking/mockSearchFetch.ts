// Mocks a JSON response from the server
export interface searchResponse {
  result: string;
  data?: string[][];
  message?: string;
  searchterm?: string;
  column?: string;
  hasheaders?: string;
}

export function mockSearchFetch(url: URL | RequestInfo): searchResponse {
  switch (url) {
    // Successful search
    case "http://localhost:3232/searchcsv?searchterm=Cindy&hasheaders=y&col=FirstName": {
      return {
        result: "success",
        searchterm: "Cindy",
        hasheaders: "y",
        column: "FirstName",
        data:  [ [ "Cindy,Li,257" ] ]
      };
    }
    // Test another successful search
    case "http://localhost:3232/searchcsv?searchterm=Merigh&hasheaders=n": {
      return {
        result: "success",
        searchterm: "Merigh",
        hasheaders: "n",
        column: "null",
        data:  [ [ "Safae,Merigh,Marcy" ] ]
      };
    }
    // Search before load
    case "http://localhost:3232/searchcsv?searchterm=beforeload&hasheaders=y" : {
      return {
        result: "error_bad_request",
        message: "No CSV file has been loaded yet."
      }
    }
    // Nonexistent column index/name
    case "http://localhost:3232/searchcsv?searchterm=Merigh&hasheaders=y&col=eu49ueriyli": {
      return {
        result: "error_bad_request",
        message: "Invalid header name or column index. Did you make a typo?",
        searchterm: "Merigh",
        hasheaders: "y",
        column: "eu49ueriyli"
      };
    }
    // Incorrect number of parameters
    case "http://localhost:3232/searchcsv?searchterm=Merigh&col=0": {
      return {
        result: "error_bad_request",
        message: "Please provide the searchterm, hasheaders, and (if desired) col parameters.",
        searchterm: "Merigh",
        column: "0"
      };
    }
    // No results
    case "http://localhost:3232/searchcsv?searchterm=noresults&hasheaders=y": {
      return {
        result: "success",
        hasheaders: "y",
        searchterm: "noresults",
        column: "null",
        data: []
      };
    }
    // hasHeaders is not y or n
    case "http://localhost:3232/searchcsv?searchterm=257&hasheaders=epoerptok&col=2": {
      return {
        result: "error_bad_request",
        hasheaders: "epoerptok",
        searchterm: "257",
        column: "2",
        message: "The hasheaders parameter must be either 'y' or 'n'"
      };
    }
    default: {
      throw new Error(`Unhandled request: ${url}`);
    }
  }
}