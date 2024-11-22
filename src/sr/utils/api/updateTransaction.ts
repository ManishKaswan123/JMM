import ApiResponse from 'sr/models/ApiResponse'
import {get, patch, post} from 'sr/utils/axios/index'
import {alertService} from 'sr/utils/services/alert.service'
import {toast} from 'react-toastify'

export const updateTransaction = async (payload: any, id: string) => {
  try {
    const res = await patch<any>(`/transaction-history/${id}`, payload)
    return res
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}
