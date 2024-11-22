import ApiResponse from 'sr/models/ApiResponse'
import {get, post} from 'sr/utils/axios/index'
import {alertService} from 'sr/utils/services/alert.service'
import {toast} from 'react-toastify'

export const createSubCategory = async (payload: any) => {
  try {
    const res = await post<any>('/sub-categories', payload)
    if (res) {
      toast.success('Sub Category Created Successfully')
      return true
    }
  } catch (e: any) {
    toast.error(e.message)
    return false
  }
}
