import {BehaviorSubject} from 'rxjs'
import parseJWT from 'sr/utils/parseToken'
import {alertService} from 'sr/utils/services/alert.service'
import {post} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

const userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user') || '{}'))

const login = async (payLoad: any) => {
  try {
    return await post<any>('/agent/validate-otp', payLoad).then(async (user) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes
      if (user.status === 'Success') {
        const res = parseJWT(user.results.accessToken)
        userSubject.next({...user.results, ...res})
        localStorage.setItem('user', JSON.stringify({...user.results, ...res}))
        return user
      } else {
        toast.error(user.error.message)
        return []
      }
    })
  } catch (e: any) {
    toast.error(e.message ? e.message : e)
    return []
  }
}

function logout() {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  localStorage.removeItem('user')
  userSubject.next(null)
  // window.location.href = '/auth'
}

function updateUserData(data: any) {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  userSubject.next(data)
  localStorage.setItem('user', JSON.stringify(data))
}

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value
  },
  logout,
  login,
  updateUserData,
}
