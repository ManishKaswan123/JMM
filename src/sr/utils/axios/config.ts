import Axios, {AxiosRequestHeaders} from 'axios'
import {ACCESS_TOKEN_KEY} from 'sr/constants/common'
import {getCookieValue} from '../helper'

const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_DEV,
})
console.log('Base url :- ', process.env.REACT_APP_API_DEV)
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use(
  async (config) => {
    const copy = {...config}
    const token = process.env.REACT_APP_AUTH_KEY

    if (typeof localStorage !== 'undefined') {
      const accessToken = getCookieValue(ACCESS_TOKEN_KEY)
      if (accessToken && copy.headers) {
        ;(copy.headers as AxiosRequestHeaders).Authorization = `Bearer ${accessToken}`
      }
    }

    // ;(copy.headers as AxiosRequestHeaders).Authorization = `Bearer ${accessToken}`

    return config
  },
  async (error) => Promise.reject(error)
)

axios.interceptors.response.use(
  async (response) => {
    if (response.data.error == null) {
      return response
    }
    return Promise.reject(response.data.error)
  },
  async (error) => Promise.reject(error)
)

export default axios
