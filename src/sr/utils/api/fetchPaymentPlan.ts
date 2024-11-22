import {get} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

interface PayloadType {
  limit?: number
  page?: number
  sortBy?: string
  projectBy?: string
  planName?: string
  isActive?: boolean
}

const filterPaymentPlan = (payload: PayloadType) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}
export const fetchPaymentPlan = async (payload: PayloadType) => {
  try {
    const filtetedPayload = filterPaymentPlan(payload)
    const res = await get<any>(`/seller-payment-plan`, filtetedPayload)
    // console.log('Ord :- ', res)
    return res
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}
