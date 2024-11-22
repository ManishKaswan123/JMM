import ApiResponse from 'sr/models/ApiResponse'
import {get, patch, post} from 'sr/utils/axios/index'
import {alertService} from 'sr/utils/services/alert.service'
import {toast} from 'react-toastify'

export const changePassword = async (payload: any) => {
  try {
    const res = await post<any>(`/auth/change-password`, payload)
    console.log('fetchUser :-', res)
    return res
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}
