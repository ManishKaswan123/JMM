// import ApiResponse from 'sr/models/ApiResponse'
import {get} from 'sr/utils/axios/index'
// import {alertService} from 'sr/utils/services/alert.service'
// import {toast} from 'react-toastify'

interface payloadType {
  userId?: string
}

interface walletBalanceApiResponse {
  balance: {
    balance: number
    rewardPointBalance: number
  }
}

const filterPayload = (payload: payloadType) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}

export const fetchWalletBalance = async (
  payload?: payloadType
): Promise<walletBalanceApiResponse> => {
  const filteredPayload = filterPayload(payload ?? {})

  try {
    const res = await get<walletBalanceApiResponse>(`users/checkWalletBalance`, filteredPayload)

    if (res) {
      return res // Return the fetched data
    } else {
      // Handle the case where results are not present
      throw new Error('No data found')
    }
  } catch (error) {
    // Throw the error to be handled by the caller
    throw new Error(`Failed to fetch : ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
