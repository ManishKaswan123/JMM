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
export const fetchOrder = async (payload: PayloadType) => {
  try {
    const filtetedPayload = filterPayload(payload)
    const res = await get<any>(`/order`, filtetedPayload)
    // console.log('Ord :- ', res)
    return res
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}
