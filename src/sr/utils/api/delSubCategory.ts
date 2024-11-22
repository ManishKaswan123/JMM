import {remove} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

export const delSubCategory = async (payload: any) => {
  try {
    const res = await remove<any>(`/sub-categories/${payload}`)
    toast.success('Sub Category Deleted Successfully')
    return true
  } catch (e: any) {
    toast.error(e.message)
    return false
  }
}
