import React, {
  FC,
  createContext,
  useContext,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from 'react'
import {WithChildren} from 'sr/helpers'

const UnwindSplashScreenContext = createContext<Dispatch<SetStateAction<number>> | undefined>(
  undefined
)

const UnwindSplashScreenProvider: FC<WithChildren> = ({children}) => {
  const [count, setCount] = useState(0)
  let visible = count > 0

  useEffect(() => {
    const splashScreen = document.getElementById('splash-screen')

    // Show SplashScreen
    if (splashScreen && visible) {
      splashScreen.classList.remove('hidden')

      return () => {
        splashScreen.classList.add('hidden')
      }
    }

    // Hide SplashScreen
    let timeout: number
    if (splashScreen && !visible) {
      timeout = window.setTimeout(() => {
        splashScreen.classList.add('hidden')
      }, 3000)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [visible])

  return (
    <UnwindSplashScreenContext.Provider value={setCount}>
      {children}
    </UnwindSplashScreenContext.Provider>
  )
}

const LayoutSplashScreen: FC<{visible?: boolean}> = ({visible = true}) => {
  // Everything are ready - remove splashscreen
  const setCount = useContext(UnwindSplashScreenContext)

  useEffect(() => {
    if (!visible) {
      return
    }

    if (setCount) {
      setCount((prev) => {
        return prev + 1
      })
    }

    return () => {
      if (setCount) {
        setCount((prev) => {
          return prev - 1
        })
      }
    }
  }, [setCount, visible])

  return null
}

export {UnwindSplashScreenProvider, LayoutSplashScreen}
