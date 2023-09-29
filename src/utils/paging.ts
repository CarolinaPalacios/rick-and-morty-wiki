export const getPageNumber = (url: string): number | null => {
  const parsedUrl = new URL(url)
  const pageNumber = parsedUrl.searchParams.get('page')

  if (pageNumber !== null) {
    return parseInt(pageNumber)
  }

  return null
}

