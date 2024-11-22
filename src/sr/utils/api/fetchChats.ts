import {get} from 'sr/utils/axios/index'
import {UserInterface} from 'sr/constants/User'

interface PayloadType {
  limit?: number
  page?: number
  senderId?: string
  eightySixResponseId?: string
  sortBy?: string
  projectBy?: string
  id?: string
  sourceType?: string
  message?: string
  recieverId?: string
}
interface chatApiResponse {
  eightySixResponseId?: any
  senderId?: UserInterface
  receiverId?: UserInterface
  sourceType?: string
  message?: string
  images?: string[]
  msgType?: number
  createdAt: string
  updatedAt: string
  id: string
}
interface fetchChatResponse {
  results: chatApiResponse[]
  page: number
  limit: number
  totalPages: number
  totalResults: number
}

const filterPayload = (payload: PayloadType) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}
export const fetchChats = async (payload: PayloadType): Promise<fetchChatResponse> => {
  const filteredPayload = filterPayload(payload)

  try {
    const res = await get<fetchChatResponse>(`/chat`, filteredPayload)

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
