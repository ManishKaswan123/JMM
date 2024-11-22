import ApiResponse from 'sr/models/ApiResponse'
import {post} from 'sr/utils/axios/index'
import {alertService} from 'sr/utils/services/alert.service'
import {toast} from 'react-toastify'

export const sendAgentOTP = async (postData: any) => {
  try {
    const {results} = await post<ApiResponse<[]>>('/agent/send-otp', postData)
    return results
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}
