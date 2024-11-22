import {patch} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

export const update86 = async (payload: Record<string, any>, id: string) => {
  try {
    const res = await patch<Record<string, any>>(`86-request//${id}`, payload)
    if (res) {
      toast.success('86  Updated Successfully')
      return true
    }
  } catch (e: any) {
    toast.error(e.message)
    return false
  }
}
