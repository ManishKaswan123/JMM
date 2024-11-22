export function getCurrentUrl(pathname: string) {
  return pathname.split(/[?#]/)[0]
}

export function checkIsActive(pathname: string, url: string) {
  const current = getCurrentUrl(pathname)
  if (!current || !url) {
    return false
  }

  if (current === url) {
    return true
  }

  if (current.indexOf(url) > -1) {
    return true
  }

  return false
}

export function checkForTabHeader(pathname: string, tab: string) {
  const current = getCurrentUrl(pathname)
  const currentArr = pathname.split('/')
  const tabs = '/' + tab
  if (current === tabs) {
    return true
  }
  if (currentArr.includes(tab)) {
    return true
  }
  return false
}
