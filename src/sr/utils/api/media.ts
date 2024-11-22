import {AxiosRequestHeaders} from 'axios'
import ApiResponse from 'sr/models/ApiResponse'
import {get, post} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

export const uploadMedia = async (formData: any) => {
  try {
    const data = await post<any>('/media/upload-file', formData, {
      'Content-Type': 'multipart/form-data',
    } as unknown as AxiosRequestHeaders)
    return data
  } catch (e: any) {
    toast.error(e?.message)
    return []
  }
}

export const getPreSignedURL = async (payload: any) => {
  try {
    return await post<any>('/media/get-signed-url', payload).then((res) => {
      if (res.status) {
        return res
      } else {
        toast.error(res?.error?.message)
        return null
      }
    })
  } catch (e: any) {
    toast.error(e?.message)
    return null
  }
}
