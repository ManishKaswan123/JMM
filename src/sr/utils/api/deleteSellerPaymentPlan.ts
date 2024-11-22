import {remove} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

export const deleteSellerPaymentPlan = async (payload: string) => {
  try {
    const res = await remove<any>(`/seller-payment-plan/${payload}`)
    toast.success('Payment Plan deleted successfully')
    return true
  } catch (e: any) {
    toast.error(e.message)
    return false
  }
}
