import {loadResponse} from "./mockLoadFetch";

export interface viewResponse {
  result: string;
  data?: string[][];
  message?: string;
}

export function mockViewFetch(url: URL | RequestInfo): viewResponse {
  switch (url) {
    case "http://localhost:3232/viewcsv": {
      return {
        result: "success",
        data: [ [ "FirstName", "LastName", "City" ], [ "Safae", "Merigh", "Marcy" ], [ "Grace", "Wan", "Offcampus" ], [ "Cindy", "Li", "257" ] ]
      };
    }
    case "http://localhost:3232/viewcsv?2": {
      return {
        result: "success",
        data: [ [ "FirstName", "LastName", "City" ], [ "Tim", "Nelson", "CIT" ], [ "Tom", "Doeppner", "RhodeIsland" ], [ "Kathi", "Fisler", "Providence" ], [ "Unknown", "Tester", "Nowhere" ] ]
      };
    }
    case "http://localhost:3232/viewcsv?beforeload": {
      return {
        result: "error_bad_request",
        message: "No CSV file has been loaded yet."
      };
    }
    case "http://localhost:3232/viewcsv?noresults": {
      return {
        result: "success",
        data: [[]]
      }
    }

    default: {
      throw new Error(`Unhandled request: ${url}`);
    }
  }
}