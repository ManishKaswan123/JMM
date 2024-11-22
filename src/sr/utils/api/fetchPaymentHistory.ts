import {get} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

interface PayloadType {
  limit?: number
  page?: number
  userId?: string
}

const filterPayload = (payload: PayloadType) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}

export const fetchPayments = async (payload: PayloadType) => {
  try {
    const filteredPayload = filterPayload(payload)
    const res = await get<any>('/payment-history', filteredPayload)
    return res
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}

export const fetchSinglePayment = async (paymentId: string) => {
  try {
    const res = await get<any>(`/payment-history/${paymentId}`, {})
    return res
  } catch (e: any) {
    toast.error(e.message)
    return null
  }
}
