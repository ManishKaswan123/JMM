import AuthToken from 'sr/models/Auth'
import {post} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

const logoutUser = async (refreshToken: string) => {
  try {
    return await post<any>('/auth/logout', {
      refreshToken,
    }).then((user) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes
      if (user) {
        toast.success(user.results)
        return user
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

export default logoutUser
