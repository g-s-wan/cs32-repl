global.fetch = vi.fn()

/**
 * Helper functions that mock the process of fetching and resolving a JSON from the API
 */

function createFetchResponse(data : any) {
  return { json: () => new Promise((resolve) => resolve(data)) }
}

export function prepareFetchMock(expected: any) {
  fetch.mockResolvedValue(createFetchResponse(expected));
}