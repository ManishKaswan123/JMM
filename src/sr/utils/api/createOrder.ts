import {post} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

export const createOrder = async (payload: any) => {
  try {
    const res = await post<any>('/order', payload)
    return res
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}
