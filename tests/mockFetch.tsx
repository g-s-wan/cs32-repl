const loadSuccessResponse = {
  result: "success",
  filepath: "data/testFile",
  message: "CSV has been loaded successfully."
};

const loadNoAccessResponse = {
  result: "error_bad_request",
  message: "File access denied. You tried to access sijlijsrlj but only files in ./data are permitted."
};

const loadNotFoundResponse = {
  result: "error_bad_request",
  filepath: "data/drijleijrlyij",
  message: "Could not find a file associated with the provided filepath. Did you make a typo?"
};

export default async function mockFetch(url: URL | RequestInfo) {
  switch (url) {
    case "http://localhost:3232/loadcsv?filepath=data/testFile": {
      return {
        json: async () => loadSuccessResponse
      };
    }
    case "http://localhost:3232/loadcsv?filepath=sijlijsrlj" : {
      return {
        json: async () => loadNoAccessResponse
      }
    }
    case "http://localhost:3232/loadcsv?filepath=data/drijleijrlyij": {
      return {
        json: async () => loadNotFoundResponse,
      };
    }
    default: {
      throw new Error(`Unhandled request: ${url}`);
    }
  }
}
