import { get } from 'sr/utils/axios/index'

interface MessageResponse {
    message: string
    source_id: string
    sender_id: string
    recipient_id: string
    type: string
    createdAt: string
    updatedAt: string
    id: string
}

interface Pagination {
    total: number;
    page: number;
    pageSize: number;
    sort: Record<string, number>;
    statusCounts: {
      open: number;
      closed: number;
      pause: number;
      active: number;
    };
}

interface FetchMessagesResponse {
  data: MessageResponse[]
  success: boolean
  pagination: Pagination;
}

interface PayloadType {
  limit?: number
  page?: number
  senderId?: string
  sortBy?: string
  projectBy?: string
}

const filterPayload = (payload: PayloadType) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}

export const fetchMessages = async (payload: PayloadType): Promise<FetchMessagesResponse> => {
  const filteredPayload = filterPayload(payload)

  try {
    const res = await get<FetchMessagesResponse>(`/message`, filteredPayload)

    if (res.data && res.data.length > 0) {
      return res // Return the fetched data
    } else {
      throw new Error('No data found')
    }
  } catch (error) {
    throw new Error(`Failed to fetch: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
