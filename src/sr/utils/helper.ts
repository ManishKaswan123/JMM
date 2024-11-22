import {storageInUse} from './localStorage'
import Cookies from 'js-cookie'

export function getLocalStorageKey<T, K>(key: string, defaultValue?: K) {
  const value = storageInUse.getItem(key)
  return value ? (JSON.parse(value) as T) : defaultValue
}

export function setLocalStorageKey<T>(key: string, value: T) {
  storageInUse.setItem(key, JSON.stringify(value))
}

export function setCookieValue<T>(key: string, value: string) {
  Cookies.set(key, value)
}

export function removeLocalStorageKey(key: string) {
  storageInUse.removeItem(key)
}

export function handleMultiPromiseResult<T>(result: PromiseSettledResult<T>, defaultValue: T) {
  return result.status === 'fulfilled' ? result.value : defaultValue
}

export function getCookieValue(key: string) {
  if (typeof window !== 'undefined') {
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${key}=`))
      ?.split('=')[1]
  }
}

export function fixNextPageUrl(url?: string | null) {
  const regex = /^http:\/\//
  if (url != null && regex.test(url)) {
    return url.replace(regex, 'https://')
  }
  return url
}

export function convertSlugToString(slug: string) {
  return slug.split('-').join(' ')
}

export function getTimeStamp(date: string) {
  const dayInS = 86400
  const hrInS = 3600
  const postDateTime = new Date(date)
  const currentDateTime = new Date()
  const diff = (currentDateTime.getTime() - postDateTime.getTime()) / 1000
  const days = Math.floor(diff / dayInS)
  const hours = Math.floor((diff % dayInS) / hrInS)
  const minutes = Math.round(((diff % dayInS) % hrInS) / 60)
  if (days === 0 && hours === 0 && minutes === 0) return 'Just Now'
  if (days === 0 && hours === 0) return `${minutes}m`
  if (days === 0) return `${hours}h`
  let diffDt = `${postDateTime.getDate()} ${postDateTime.toLocaleString('default', {
    month: 'long',
  })}`
  if (currentDateTime.getFullYear() !== postDateTime.getFullYear()) {
    diffDt += ` ${postDateTime.getFullYear()}`
  }
  return diffDt
}

export function isArray<T>(array?: T[] | null) {
  return Array.isArray(array) && array.length > 0
}

export function createUUID() {
  let dt = new Date().getTime()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (dt + Math.random() * 16) % 16 | 0
    dt = Math.floor(dt / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}

export const htmlToString = (html: string) =>
  html
    .replace(/<[^>]+>/g, '')
    .trim()
    .replace(/\n/g, '')

export function getThumbnailUrl(url: string) {
  const splitArray = url.split('/')
  return `https://img.youtube.com/vi/${splitArray[splitArray.length - 1]}/0.jpg`
}

export function slugToString(slug: string) {
  return slug.split('-').join(' ')
}

const padNumberWithZero = (num: number) => {
  return num.toString().padStart(2, '0')
}

export function secondsToMinSec(inSeconds: number) {
  const minutes = Math.floor(inSeconds / 60)
  const seconds = inSeconds - minutes * 60
  return `${padNumberWithZero(minutes)}:${padNumberWithZero(seconds)}`
}

export const persistToken = (key: string, value = '', expiresIn = -1) => {
  document.cookie = `${key}=${value}; max-age=${expiresIn}; path=/; samesite=strict;`
}

export function numDifferentiation(value: any) {
  const val = Math.abs(value)
  if (val >= 10000000) return `${(value / 10000000).toFixed(2)} Cr`
  if (val >= 100000) return `${(value / 100000).toFixed(2)} Lac`
  return value
}
export function formatDate(date: string) {
  const newDate = new Date(date)
  const hours = new Date().getHours().toString().padStart(2, '0')
  const minutes = new Date().getMinutes().toString().padStart(2, '0')

  const formattedDate = `${newDate.toISOString().split('T')[0]}T${hours}:${minutes}:00.000Z`
  return formattedDate
}
