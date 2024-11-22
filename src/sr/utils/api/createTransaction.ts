import {post} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

export const createTransaction = async (payload: any) => {
  try {
    const res = await post<any>('/transaction-history', payload)
    return res
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}
