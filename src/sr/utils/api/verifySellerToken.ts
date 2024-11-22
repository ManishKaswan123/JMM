import {post} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

export const verifySellerToken = async (token: string) => {
  try {
    // const res = await post<any>(`/auth/verify-seller-token?${token}`, {})
    const res = await post<any>(`/auth/verify-seller-token?token=${token}`, {})
    return res
  } catch (e: any) {
    // console.log(e)
    toast.error(e.message)
    return null
  }
}
