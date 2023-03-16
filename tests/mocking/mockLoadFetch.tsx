export interface loadResponse {
  result: string;
  filepath: string;
  message: string;
}

export function mockLoadFetch(url: URL | RequestInfo): loadResponse {
  switch (url) {
    case "http://localhost:3232/loadcsv?filepath=data/testFile": {
      return {
        result: "success",
        filepath: "data/testFile",
        message: "Successfully loaded data/testFile"
      };
    }
    case "http://localhost:3232/loadcsv?filepath=sijlijsrlj" : {
      return {
        result: "error_bad_request",
        filepath: "sijlijsrlj",
        message: "File access denied. You tried to access sijlijsrlj but only files in ./data are permitted."
      }
    }
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
