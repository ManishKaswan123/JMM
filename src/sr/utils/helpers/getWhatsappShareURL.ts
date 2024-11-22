const getWhatsappShareURL = (url: string, slug: string, postType?: string) => {
  // if already on specific pages directly send the url
  if (url.includes(slug)) {
    return `https://wa.me/?text=${url}`
  }
  // if on home page need to send the link of community/86six feeds
  return `https://wa.me/?text=${url}/${
    postType === 'community' ? 'community/post' : '86six/post'
  }/${slug}`
}

export default getWhatsappShareURL
