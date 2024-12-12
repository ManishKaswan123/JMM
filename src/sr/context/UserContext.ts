import {createContext} from 'react'

export const UserContext = createContext<{
  user: string | undefined
  setUser: React.Dispatch<React.SetStateAction<string | undefined>>
}>({user: undefined, setUser: () => undefined})
