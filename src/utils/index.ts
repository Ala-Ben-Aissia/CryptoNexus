export function delay(ms: number = 2) {
  return new Promise((res) => setTimeout(res, ms))
}

export function fetchData(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  return fetch(input, {
    ...init,
    headers: {
      'x-cg-demo-api-key': import.meta.env.VITE_API_KEY,
      'Access-Control-Allow-Origin': '*',
    },
  })
}
