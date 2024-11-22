import ApiResponse from 'sr/models/ApiResponse'
import {post} from 'sr/utils/axios/index'
import {alertService} from 'sr/utils/services/alert.service'
import {toast} from 'react-toastify'

export const submitSellerOnBoardingForm = async (token: any, formData: any) => {
  try {
    const res = await post<any>(`/seller/${token}`, formData)
    if (res) {
      toast.success('Seller Onboarding form submitted successfully')
      return res
    }
  } catch (e: any) {
    toast.error(e.message)
    return null
  }
}
