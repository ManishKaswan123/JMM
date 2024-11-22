import {remove} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

export const delete86 = async (payload: string) => {
  try {
    const res = await remove<any>(`/86-request//${payload}`)
    return res
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}
