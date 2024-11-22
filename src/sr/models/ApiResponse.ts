export default interface ApiResponse<T> {
  meta: object
  status: string
  results: any
  error: any
}
