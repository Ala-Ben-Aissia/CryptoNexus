export function delay(ms: number = 2) {
  return new Promise((res) => setTimeout(res, ms))
}
