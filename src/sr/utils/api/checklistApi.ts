import {get} from 'sr/utils/axios/index'
import {JmmApiResponse} from './contant'
import {CompanyResponse} from './fetchCompany'
import {Customer} from './customerApi'

interface PayloadType {
  limit?: number
  page?: number
  type?: string
  subtype?: string
  company_id?: string
  customer_id?: string
  status?: string
}
interface ModifiedCompanyResponse extends Omit<CompanyResponse, 'id'> {
  _id: number
}
interface ModifiedCustomerResponse extends Omit<Customer, 'id'> {
  _id: number
}

export interface Checklist {
  name: string
  type: string
  subtype: string
  company_id: ModifiedCompanyResponse
  customer_id: ModifiedCustomerResponse
  task_ids: string[]
  remarks: string
  location_ids: string[]
  checklist_ids: string[]
  status: string
  createdAt: string
  updatedAt: string
  id: string
}

export type ChecklistApiResponse = JmmApiResponse<Checklist[]>
export type SingleChecklistApiResponse = JmmApiResponse<Checklist>

const filterPayload = (payload: PayloadType) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}
export const fetchChecklists = async (payload: PayloadType): Promise<ChecklistApiResponse> => {
  const filteredPayload = filterPayload(payload)

  try {
    const res = await get<ChecklistApiResponse>(`/checklist`, filteredPayload)

    if (res.success && res.data && res.data.length > 0) {
      return res // Return the fetched data
    } else {
      // Handle the case where results are not present
      throw new Error('No results found')
    }
  } catch (error) {
    // Throw the error to be handled by the caller
    throw new Error(`Failed to fetch : ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
export const fetchSingleChecklist = async (id: string): Promise<SingleChecklistApiResponse> => {
  try {
    const res = await get<SingleChecklistApiResponse>(`/checklist`, {id})

    if (res.success && res.data) {
      return res // Return the fetched data
    } else {
      // Handle the case where results are not present
      throw new Error('No results found')
    }
  } catch (error) {
    // Throw the error to be handled by the caller
    throw new Error(`Failed to fetch : ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
