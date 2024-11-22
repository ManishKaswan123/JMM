import {getPreSignedURL} from 'sr/utils/api/media'

const getSignedURL = async (url: string) => {
  if (url) {
    const payLoad = {
      fileName: url,
    }
    // return `https://abc.in/${url}`
    const res: any = await getPreSignedURL(payLoad)
    if (res && res?.status) {
      return res?.results?.url
    }
  } else {
    return url
  }
}

export default getSignedURL
