// import ApiResponse from 'sr/models/ApiResponse'
import {get, remove} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

interface PayloadType {
  limit?: number
  page?: number
  sortBy?: string
  projectBy?: string
  // transactionType?: string
  // transactionMode?: string
  // transactionNo?: string
  // status?: string
}

const filterPayload = (payload: PayloadType) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}

export const fetchTransactions = async (payload: PayloadType) => {
  try {
    const filteredPayload = filterPayload(payload)
    const res = await get<any>('/transaction-history', filteredPayload)
    return res
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}

export const deleteTransaction = async (id: string) => {
  try {
    const res = await remove<any>(`/transaction-history/${id}`, {})
    return res
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}
