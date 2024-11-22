import ApiResponse from 'sr/models/ApiResponse'
import {get, remove} from 'sr/utils/axios/index'
import {alertService} from 'sr/utils/services/alert.service'
import {toast} from 'react-toastify'

export const deleteCategory = async (payload: string) => {
  try {
    const res = await remove<any>(`/categories/${payload}`)
    toast.success('Category Deleted Successfully')
    return true
  } catch (e: any) {
    toast.error(e.message)
    return false
  }
}
