import {post} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

export const createAppVersion = async (payload: any) => {
  try {
    const res = await post<any>('/mobile-app-version-history', payload)
    if (res) {
      toast.success('App Version created successfully')
      return true
    }
  } catch (e: any) {
    toast.error(e.message)
    return false
  }
}
