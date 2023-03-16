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
    case "http://localhost:3232/searchcsv?searchterm=Cindy&hasheaders=y&col=0": {
      return {
        result: "success",
        searchterm: "Cindy",
        hasheaders: "y",
        column: "0",
        data:  [ [ "Row 3: Cindy,Li,257" ] ]
      };
    }
    // Search before load
    case "http://localhost:3232/searchcsv?searchterm=beforeload&hasheaders=y" : {
      return {
        result: "error_bad_request",
        message: "No CSV file has been loaded yet."
      }
    }
    // search nonexistent column index/name
    case "http://localhost:3232/searchcsv?searchterm=Merigh&hasheaders=y&col=eu49ueriyli": {
      return {
        result: "error_bad_request",
        message: "Invalid header name or column index. Did you make a typo?",
        searchterm: "Merigh",
        hasheaders: "y",
        column: "eu49ueriyli"
      };
    }
    //search incorrect number of parameters
    case "http://localhost:3232/searchcsv?searchterm=Merigh&col=0": {
      return {
        result: "error_bad_request",
        message: "Please provide the searchterm, hasheaders, and (if desired) col parameters.",
        searchterm: "Merigh",
        column: "0"
      };
    }
    // search no results
    case "http://localhost:3232/searchcsv?searchterm=noresults&hasheaders=y&col=2": {
      return {
        result: "success",
        hasheaders: "y",
        searchterm: "noresults",
        column: "2",
        data: [[]]
      };
    }
    // search hasHeaders is not y or n
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