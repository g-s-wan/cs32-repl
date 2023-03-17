// Mocks a JSON response from the server
export interface loadResponse {
  result: string;
  filepath: string;
  message: string;
}

/**
 * Maps URLs/requests to expected JSON responses from the API when loading
 * @param url - API endpoint and parameters
 */
export function mockLoadFetch(url: URL | RequestInfo): loadResponse {
  switch (url) {
    case "http://localhost:3232/loadcsv?filepath=data/testFile": {
      return {
        result: "success",
        filepath: "data/testFile",
        message: "Successfully loaded data/testFile"
      };
    }
    // Test with at least two files
    case "http://localhost:3232/loadcsv?filepath=data/testFile2": {
      return {
        result: "success",
        filepath: "data/testFile2",
        message: "Successfully loaded data/testFile2"
      };
    }
    // File is outside the allowed directory
    case "http://localhost:3232/loadcsv?filepath=sijlijsrlj" : {
      return {
        result: "error_bad_request",
        filepath: "sijlijsrlj",
        message: "File access denied. You tried to access sijlijsrlj but only files in ./data are permitted."
      }
    }
    // Inside allowed directory, but file doesn't exist
    case "http://localhost:3232/loadcsv?filepath=data/drijleijrlyij": {
      return {
        result: "error_bad_request",
        filepath: "data/drijleijrlyij",
        message: "Could not find a file associated with the provided filepath. Did you make a typo?"
      };
    }
    default: {
      throw new Error(`Unhandled request: ${url}`);
    }
  }
}
