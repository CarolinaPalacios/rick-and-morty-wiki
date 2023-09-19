export const getPageNumber = (url: string): number | null => {
  const parsedUrl = new URL(url)
  const pageNumber = parsedUrl.searchParams.get('page')

  if (pageNumber !== null) {
    return parseInt(pageNumber)
  }

  return null
}

import type { SerializedError } from '../types/API'

export const isSerializedError = (
  payload: unknown
): payload is SerializedError => {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'message' in payload &&
    'status' in payload
  )
}