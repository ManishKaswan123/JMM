import ApiResponse from 'sr/models/ApiResponse'
import {get, patch, post} from 'sr/utils/axios/index'
import {alertService} from 'sr/utils/services/alert.service'
import {toast} from 'react-toastify'

export const updateCategory = async (payload: any, id: string) => {
  try {
    const res = await patch<any>(`/categories/${id}`, payload)
    if (res) {
      toast.success('Category Updated Successfully')
      return true
    }
  } catch (e: any) {
    toast.error(e.message)
    return false
  }
}
