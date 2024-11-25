import { get } from 'sr/utils/axios/index'

interface ProposalDetails {
    cleaner_id: string
    descrption: string
    expected_rate: string
    createdAt: string
    updatedAt: string
    id: string
}

interface ProposalDetailsPagination {
  total: number
  page: number
  pageSize: number
  sort: Record<string, number>
}

interface FetchProposalDetailsResponse {
  success: boolean
  data: ProposalDetails[]
  pagination: ProposalDetailsPagination
}

interface ProposalDetailsPayload {
  limit?: number
  page?: number
  sortBy?: string
  status?: string
}

const filterPayload = (payload: ProposalDetailsPayload) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}

export const fetchProposalDetails = async (payload: ProposalDetailsPayload): Promise<FetchProposalDetailsResponse> => {
  const filteredPayload = filterPayload(payload)

  try {
    const res = await get<FetchProposalDetailsResponse>(`/cleaner/proposaldetails`, filteredPayload)

    if (res.data && res.data.length > 0) {
      return res // Return the fetched data
    } else {
      throw new Error('No data found')
    }
  } catch (error) {
    throw new Error(`Failed to fetch: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
