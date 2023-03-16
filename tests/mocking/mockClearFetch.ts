export interface clearResponse {
  result: string;
  message: string;
}

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