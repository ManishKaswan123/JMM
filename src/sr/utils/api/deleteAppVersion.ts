import {remove} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

export const deleteAppVersion = async (payload: string) => {
  try {
    const res = await remove<any>(`/mobile-app-version-history/${payload}`)
    toast.success('App Version deleted successfully')
    return true
  } catch (e: any) {
    toast.error(e.message)
    return false
  }
}
