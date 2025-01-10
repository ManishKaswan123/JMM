import {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'

export const useUrlItems = () => {
  const location = useLocation()
  const [urlItems, setUrlItems] = useState<string[]>([])

  useEffect(() => {
    setUrlItems(location.pathname.split('/'))
  }, [location])

  return urlItems
}
