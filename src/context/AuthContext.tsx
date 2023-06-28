// ** React Imports
import { ReactNode, createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { userLogin } from 'src/pages/apps/calendar/CalendarService'
import { AuthValuesType, ErrCallbackType, LoginParams, UserDataType } from './types'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: {
    id: 1,
    role: "admin",
    email: "saisasank001@gmail.com",
    fullName: "sai",
    username: "sasank"
  },
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    // const initAuth = async (): Promise<void> => {
    //   const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
    //   if (storedToken) {
    //     setLoading(true)
    //     await axios
    //       .get(authConfig.meEndpoint, {
    //         headers: {
    //           Authorization: storedToken
    //         }
    //       })
    //       .then(async response => {
    //         setLoading(false)
    //         setUser({ ...response.data.userData })
    //       })
    //       .catch(() => {
    //         localStorage.removeItem('userData')
    //         localStorage.removeItem('refreshToken')
    //         localStorage.removeItem('accessToken')
    //         setUser(null)
    //         setLoading(false)
    //         if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
    //           router.replace('/auth/login')
    //         }
    //       })
    //   } else {
    //     setLoading(false)
    //   }
    // }

    // initAuth()
    setUser({
      id: 1,
      role: "admin",
      email: "saisasank001@gmail.com",
      fullName: "sai",
      username: "sasank"
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    // axios
    //   .post(authConfig.loginEndpoint, params)
    //   .then(async response => {
    //     params.rememberMe
    //       ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
    //       : null
    //     const returnUrl = router.query.returnUrl
    //     console.log(response, "response");

    //     setUser({ ...response.data.userData })
    //     params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null

    //     const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

    //     router.replace(redirectURL as string)
    //   })

    //   .catch(err => {
    //     if (errorCallback) errorCallback(err)
    //   })


    const result = userLogin(params);
    console.log(result);

    result.then((response) => {
      console.log(response, "response", params.rememberMe);
      params.rememberMe
        ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.token)
        : null;
      const returnUrl = router.query.returnUrl
      console.log(response.user, "response");
      setUser({ ...response.user })
      params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.user)) : null
      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
      // const redirectURL = '/'
      router.replace(redirectURL as string)
      console.log("response");

    })
      .catch(err => {
        console.log(err);

        if (errorCallback) errorCallback(err)
      })

  }

  const handleLogout = () => {
    // setUser(null)
    // window.localStorage.removeItem('userData')
    // window.localStorage.removeItem(authConfig.storageTokenKeyName)
    // router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
