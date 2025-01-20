import {get} from 'sr/utils/axios/index'
import {JmmApiResponse} from './contant'

interface NotesResponse {
  _id: string
  company_id: string
  applicant_id: string
  notes: string
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}

export type FetchNotesResponse = JmmApiResponse<NotesResponse[]>

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

export const fetchNotes = async (payload: PayloadType): Promise<FetchNotesResponse> => {
  const filteredPayload = filterPayload(payload)

  try {
    const res = await get<FetchNotesResponse>(`/application/notes`, filteredPayload)

    if (res.success === true && res.data) {
      return res // Return the fetched data
    } else {
      throw new Error('No data found')
    }
  } catch (error) {
    throw new Error(`Failed to fetch: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
