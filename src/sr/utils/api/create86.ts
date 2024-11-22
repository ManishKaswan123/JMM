import {post} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

export const create86 = async (payload: Record<string, any>) => {
  try {
    const res = await post<Record<string, any>>('/86-request', payload)
    if (res) {
      toast.success('86 Created Successfully')
      return true
    }
  } catch (e: any) {
    toast.error(e.message)
    return false
  }
}
