import {patch} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

export const updateChat = async (payload: any, id: string) => {
  try {
    const res = await patch<any>(`/chat/${id}`, payload)
    if (res) {
      toast.success('Chat updated successfully')
      return res
    }
  } catch (e: any) {
    toast.error(e.message)
    return false
  }
}
