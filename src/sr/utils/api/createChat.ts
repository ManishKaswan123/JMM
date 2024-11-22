import {post} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

export const createChat = async (payload: Record<string, any>) => {
  try {
    const res = await post<any>('/chat', payload)
    if (res) {
      toast.success('Chat created successfully')
      return true
    }
  } catch (e: any) {
    toast.error(e.message)
    return false
  }
}
