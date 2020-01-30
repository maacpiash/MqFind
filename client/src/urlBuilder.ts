export default function urlBuilder(
  baseUrl: string,
  params: { [key: string]: string | number | boolean | undefined },
): string {
  const query: string[] = []
  for (const k in params) {
    if (params[k]) query.push(`${k}=${params[k]}`)
  }
  return baseUrl + '?' + query.join('&')
}
