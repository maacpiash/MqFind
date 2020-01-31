export default function urlBuilder(
  baseUrl: string,
  params: { [key: string]: string | string[] | number | boolean | undefined },
): string {
  const query: string[] = []
  for (const k in params) {
    if (params[k]) {
      if (k !== 'prefGender')
        query.push(`${k}=${params[k]}`)
      else {
        const arr = params[k] as string[]
        if (arr.length) query.push(`${k}=${params[k]}`)
      }
    }
  }
  return baseUrl + '?' + query.join('&')
}
