global.fetch = vi.fn()

function createFetchResponse(data : any) {
  return { json: () => new Promise((resolve) => resolve(data)) }
}

export function prepareFetchMock(expected: any) {
  fetch.mockResolvedValue(createFetchResponse(expected));
}