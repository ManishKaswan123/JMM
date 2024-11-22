import {remove} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

export const deleteChat = async (payload: string) => {
  try {
    const res = await remove<any>(`/chat/${payload}`)
    toast.success('Chat deleted successfully')
    return true
  } catch (e: any) {
    toast.error(e.message)
    return false
  }
}
