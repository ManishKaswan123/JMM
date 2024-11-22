// import ApiResponse from 'sr/models/ApiResponse'
import {get, remove} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

interface PayloadType {
  limit?: number
  page?: number
  title?: string
  isPublished?: boolean
  userId?: string
  sortBy?: string
  radius?: number
  lat?: number
  lng?: number
  status?: string
  // category?: string
  // hashtags?: string
  // businessType?: string
  // condition?: string
  // countryCode?: string
  // projectBy?: string
  // type: Joi.string(), // .valid(1, 2, 3), // 1:sell,2:buy,3:deadstock,
}

const filterPayload = (payload: PayloadType) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}

export const fetchProduct = async (payload: PayloadType) => {
  try {
    const filteredPayload = filterPayload(payload)
    const res = await get<any>('/products', filteredPayload)
    return res
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}

export const fetchSingleProduct = async (id: string) => {
  try {
    const res = await get<any>(`/products/${id}`, {})
    return res
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}
export const deleteProduct = async (id: string) => {
  try {
    const res = await remove<any>(`/products/${id}`, {})
    return res
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}
