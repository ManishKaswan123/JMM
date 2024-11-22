import {AxiosRequestHeaders, AxiosRequestConfig} from 'axios'

import axios from './config'

export async function get<T>(
  url: string,
  params: Record<string, unknown> = {},
  headers?: AxiosRequestHeaders,
  signal?: AbortSignal
) {
  return (await axios.get<T>(url, {params, headers, signal})).data
}

export async function post<T>(
  url: string,
  body: Record<string, unknown> | FormData,
  extraHeaders?: AxiosRequestConfig,
  headers?: AxiosRequestHeaders
) {
  return (await axios.post<T>(url, body, {...extraHeaders, headers})).data
}

export async function put<T>(
  url: string,
  body: Record<string, unknown> | Blob | null,
  headers?: AxiosRequestHeaders
) {
  return (await axios.put<T>(url, body, {headers})).data
}

export async function patch<T>(
  url: string,
  body: Record<string, unknown>,
  headers?: AxiosRequestHeaders
) {
  return (await axios.patch<T>(url, body, {headers})).data
}

export async function remove<T>(
  url: string,
  params: Record<string, unknown> = {},
  headers?: AxiosRequestHeaders
) {
  return (await axios.delete<T>(url, {params, headers})).data
}
