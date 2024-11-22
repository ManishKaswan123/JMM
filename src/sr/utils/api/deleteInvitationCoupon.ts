import {remove} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

export const deleteInvitationCoupon = async (payload: string) => {
  try {
    const res = await remove<any>(`/seller-invitation-code/${payload}`)
    toast.success('Invitation coupon deleted successfully')
    return true
  } catch (e: any) {
    toast.error(e.message)
    return false
  }
}
