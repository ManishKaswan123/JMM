import {post} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

export const createSellerPaymentPlan = async (payload: any) => {
  try {
    const res = await post<any>('/seller-payment-plan', payload)
    if (res) {
      toast.success('Payment Plan created successfully')
      return true
    }
  } catch (e: any) {
    toast.error(e.message)
    return false
  }
}
