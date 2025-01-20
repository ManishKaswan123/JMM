import {get} from 'sr/utils/axios/index'
import {JmmApiResponse} from './contant'

export interface ProposalDetails {
  cleaner_id: string
  descrption: string
  expected_rate: string
  createdAt: string
  updatedAt: string
  id: string
}

export type FetchProposalDetailsResponse = JmmApiResponse<ProposalDetails[]>
export type FetchSingleProposalDetailsResponse = JmmApiResponse<ProposalDetails>

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

export const fetchProposalDetails = async (
  payload: ProposalDetailsPayload
): Promise<FetchProposalDetailsResponse> => {
  const filteredPayload = filterPayload(payload)

  try {
    const res = await get<FetchProposalDetailsResponse>(`/cleaner/proposaldetails`, filteredPayload)

    if (res.success === true && res.data) {
      return res // Return the fetched data
    } else {
      throw new Error('No data found')
    }
  } catch (error) {
    throw new Error(`Failed to fetch: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
export const fetchSingleProposalDetails = async (
  id: string
): Promise<FetchSingleProposalDetailsResponse> => {
  try {
    const res = await get<FetchSingleProposalDetailsResponse>(`/cleaner/proposaldetails`, {id})

    if (res.data && res.success === true) {
      return res // Return the fetched data
    } else {
      throw new Error('No data found')
    }
  } catch (error) {
    throw new Error(`Failed to fetch: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
