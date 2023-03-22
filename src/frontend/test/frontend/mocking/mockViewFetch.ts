// Mocks a JSON response from the API
export interface viewResponse {
  result: string;
  data?: string[][];
  message?: string;
}

export function mockViewFetch(url: URL | RequestInfo): viewResponse {
  switch (url) {
    // Successful view
    case "http://localhost:3232/viewcsv": {
      return {
        result: "success",
        data: [ [ "FirstName", "LastName", "City" ], [ "Safae", "Merigh", "Marcy" ], [ "Grace", "Wan", "Offcampus" ], [ "Cindy", "Li", "257" ] ]
      };
    }
    // Another successful view - API doesn't care about extra params
    case "http://localhost:3232/viewcsv?2": {
      return {
        result: "success",
        data: [ [ "FirstName", "LastName", "City", "FavFood" ], [ "Tim", "Nelson", "CIT", "Pizza" ], [ "Tom", "Doeppner", "RhodeIsland", "Sushi" ], [ "Kathi", "Fisler", "Providence", "Burgers" ], [ "Unknown", "Tester", "Nowhere", "FriedRice" ] ]
      };
    }
    // View before load
    case "http://localhost:3232/viewcsv?beforeload": {
      return {
        result: "error_bad_request",
        message: "No CSV file has been loaded yet."
      };
    }
    // Nothing in the CSV
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