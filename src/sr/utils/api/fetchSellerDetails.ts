import {get, patch} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'
import {SellerDetailsApiResponse} from 'app/pages/module/user/SellerDetailsCard'

export const fetchSellerDetails = async (payload: string): Promise<SellerDetailsApiResponse> => {
  if (payload === '') return {} as SellerDetailsApiResponse
  try {
    const res = await get<SellerDetailsApiResponse>(`/seller/${payload}`, {})
    console.log('res', res)

    if (res) {
      return res // Return the fetched data
    } else {
      // Handle the case where results are not present
      throw new Error('No results found')
    }
  } catch (error) {
    // Throw the error to be handled by the caller
    throw new Error(`Failed to fetch : ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export const updateSellerStatus = async (userId: string, payload: any) => {
  try {
    const res = await patch<any>(`/seller/change-status/${userId}`, payload)

    if (res) {
      // console.log('inside updateSellerStatus', res)
      toast.success(`Seller ${payload.status} successfully`)
      return res
    }
  } catch (e: any) {
    toast.error(e.message)
    return false
  }
}
