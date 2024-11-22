import {post} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

export const createInvitationCoupon = async (payload: any) => {
  try {
    const res = await post<any>('/seller-invitation-code', payload)
    if (res) {
      toast.success('Invitation coupon created successfully')
      return true
    }
  } catch (e: any) {
    toast.error(e.message)
    return false
  }
}
