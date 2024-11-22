import AuthToken from 'sr/models/Auth'
import {post} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

const fetchTokenFromRefreshToken = async (refreshToken: string, redirectUri?: string) => {
  try {
    return await post<any>('/auth/refresh-token', {
      refreshToken,
    }).then((user) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes
      if (user.status === 'Success') {
        return user.results as AuthToken
      } else {
        toast.error(user.error.message)
        return null
      }
    })
  } catch (e: any) {
    toast.error(e.message)
    return null
  }
}

export default fetchTokenFromRefreshToken
