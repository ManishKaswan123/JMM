import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from 'react'
import * as authHelper from './AuthHelper'
import {AuthModel, UserModel} from './_models'

type AuthContextProps = {
  auth: AuthModel | undefined
  saveAuth: (auth: AuthModel | undefined) => void
  // currentUser: UserModel | undefined
  //   setter function to set the value in user model
  // setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>
  logout: () => void
}
type WithChildren = {
  children?: ReactNode
}
const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  // currentUser: {id: 6755},
  // setCurrentUser: () => {},
  logout: () => {},
}
// create auth context
const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)
// use auth context
const useAuth = () => {
  return useContext(AuthContext)
}

// provider auth context
const AuthProvider = ({children}: WithChildren) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>()
  const saveAuth = (authParams: AuthModel | undefined) => {
    // set auth for user
    setAuth(authParams)
    if (authParams) {
      authHelper.setAuth(authParams)
    } else {
      authHelper.removeAuth()
    }
  }

  //   logout functionality
  const logout = () => {
    saveAuth(undefined)
    setCurrentUser(undefined)
  }

  return <AuthContext.Provider value={{auth, saveAuth, logout}}>{children}</AuthContext.Provider>
}

// provider auth context
const authInit = () => {}

export {useAuth, AuthProvider}
