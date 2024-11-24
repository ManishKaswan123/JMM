import {patch} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

export const updateCompanyDetail = async (payload: Record<string, any>, id: string) => {
  try {
    const res = await patch<Record<string, any>>(`company//${id}`, payload)
    if (res) {
      toast.success('Company Detail Updated Successfully')
      return true
    }
  } catch (e: any) {
    toast.error(e.message)
    return false
  }
}
