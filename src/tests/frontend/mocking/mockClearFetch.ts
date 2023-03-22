// Mocks a JSON response from the server
export interface clearResponse {
  result: string;
  message: string;
}

/**
 * Maps URLs/requests to expected JSON responses from the API when clearing
 * @param url - API endpoint and parameters
 */
export function mockClearFetch(url: URL | RequestInfo): clearResponse {
  switch (url) {
    case "http://localhost:3232/clear": {
      return {
        result: "success",
        message: "Loaded file has been cleared."
      };
    }
    default: {
      throw new Error(`Unhandled request: ${url}`);
    }
  }
}