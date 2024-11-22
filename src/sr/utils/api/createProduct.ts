// src/utils/api/createProduct.ts
import {post} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

interface ProductPayload {
  title: string
  description: string
  businessType: string[]
  category: string[]
  hashtags: string[]
  location: {
    coordinates: number[]
    type: string
  }
  images: string[]
  isPublished: boolean
  quantity: string
  userId: string
  timeframe: string
  isWillingToPay: boolean
  address: {
    countryCode: string
  }
  delivery: number
  radius: number
  status: string
}

export const createProduct = async (payload: any) => {
  try {
    const res = await post<any>('/86-request', payload)
    toast.success('Product created successfully')
    return res
  } catch (e: any) {
    toast.error(e.message)
    throw e
  }
}
