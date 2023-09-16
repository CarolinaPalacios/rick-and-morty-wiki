export interface InfoResponse {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export interface PagingState {
  pages: number | null
  current: number
  next: {
    page: number | null
    url: string | null
  }
  prev: {
    page: number | null
    url: string | null
  }
}