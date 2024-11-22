import {get, patch, post, remove} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'
import ApiResponse from 'app/pages/module/86Response/components/86ResponseTypes'
interface payloadType {
  limit?: Number
  page?: Number
  eightySix?: String
  senderId?: String
  receiverId?: String
  sortBy?: String
  projectBy?: String
}

interface fetch86ResponseResponse {
  results: ApiResponse[]
  page: number
  limit: number
  totalPages: number
  totalResults: number
}

export const create86Response = async (payload: Record<string, any>) => {
  try {
    const res = await post<Record<string, any>>('/86-response', payload)
    if (res) {
      toast.success('86 Response Created Successfully')
      return true
    }
  } catch (e: any) {
    toast.error(e.message)
    return false
  }
}
export const delete86Response = async (payload: string) => {
  try {
    const res = await remove<any>(`/86-response//${payload}`)
    toast.success('86 Response Deleted Successfully')
    return true
  } catch (e: any) {
    toast.error(e.message)
    return false
  }
}

const filterPayload = (payload: payloadType) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}

export const fetch86Response = async (payload: payloadType): Promise<fetch86ResponseResponse> => {
  const filteredPayload = filterPayload(payload)

  try {
    const res = await get<fetch86ResponseResponse>(`/86-response`, filteredPayload)

    if (res.results && res.results.length > 0) {
      return res // Return the fetched data
    } else {
      // Handle the case where results are not present
      throw new Error('No data found')
    }
  } catch (error) {
    // Throw the error to be handled by the caller
    throw new Error(`Failed to fetch : ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
export const update86Response = async (payload: any, id: string) => {
  try {
    const res = await patch<any>(`86-response//${id}`, payload)
    if (res) {
      toast.success('86 Response Updated Successfully')
      return true
    }
  } catch (e: any) {
    toast.error(e.message)
    return false
  }
}
export const fetchSingle86Response = async (payload: string) => {
  try {
    const res = await get<any>(`/86-response/${payload}`, {})
    if (res) return res
    else throw new Error('No data found')
  } catch (error) {
    throw new Error(`Failed to fetch : ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
