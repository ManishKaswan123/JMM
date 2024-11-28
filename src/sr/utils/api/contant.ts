export interface JmmApiResponse<T> {
  success: boolean
  data: T
  pagination: {
    total: number
    page: number
    pageSize: number
    sort: Record<string, number>
  }
}
