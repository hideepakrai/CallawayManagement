/* eslint-disable react-refresh/only-export-components */
import {FC, useState, useEffect, createContext, useContext, Dispatch, SetStateAction} from 'react'
import {LayoutSplashScreen} from '../../../../_metronic/layout/core'
import {AuthModel, UserModel} from './_models'
import * as authHelper from './AuthHelpers'
import {getUserByToken} from './_requests'
import {WithChildren} from '../../../../_metronic/helpers'
import { useSelector, useDispatch } from 'react-redux'
import {getCurrentUser,getAdminToken,
  getUserAccount,
  getUserOrders,addUser,
  addUserAccount} from "../../../slice/UserSlice/UserSlice";
  import {reloadTravisProduct,reloadCategory,reloadStyleCode, addTravisLocalStorage} from "../../../slice/allProducts/TravisMethewSlice";
import {addOgioLocalStroge, getOgioProducts} from "../../../slice/allProducts/OgioSlice"
import { addApparelLocalStorage } from '../../../slice/allProducts/CallawayApparelSlice'
import { addHardGoodsLocalStorage } from '../../../slice/allProducts/CallAwayGoodsSlice'

type AuthContextProps = {
  auth: AuthModel | undefined
  saveAuth: (auth: AuthModel | undefined) => void
  currentUser: UserModel | undefined
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>
  logout: () => void
}

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({children}) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>()
  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth)
    if (auth) {
      authHelper.setAuth(auth)
    } else {
      authHelper.removeAuth()
    }
  }

  const logout = () => {
    saveAuth(undefined)
    setCurrentUser(undefined)
  }
   const dispatch= useDispatch()

  useEffect(() => {

   
    // Load authentication state from local storage
    saveAuth(JSON.parse(localStorage.getItem('getuserAdmintoken') as string))
    setCurrentUser(JSON.parse(localStorage.getItem('getCurrentUsers') as string))
    dispatch(addUserAccount({
      currentUser:JSON.parse(localStorage.getItem('getCurrentUsers') as string),
      userProfile:JSON.parse(localStorage.getItem('getUserProfile') as string),
      adminToken: JSON.parse(localStorage.getItem('getuserAdmintoken') as string)
    }))
    

    // dispatch(addOgioLocalStroge({
    //   ogio: JSON.parse(localStorage.getItem('Ogio') as string)
    // }))

    
    // dispatch(addTravisLocalStorage({
    //   travis: JSON.parse(localStorage.getItem('Travis') as string)
    // }))
    // dispatch(addApparelLocalStorage({
    //   apparel: JSON.parse(localStorage.getItem('SoftGoods') as string)
    // }))
    // dispatch(addHardGoodsLocalStorage({
    //   goods: JSON.parse(localStorage.getItem('HardGoods') as string)
    // }))

  }, []);

  return (
    <AuthContext.Provider value={{auth, saveAuth, currentUser, setCurrentUser, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthInit: FC<WithChildren> = ({children}) => {
  const {auth, currentUser, logout, setCurrentUser} = useAuth()
  const [showSplashScreen, setShowSplashScreen] = useState(true)


  useEffect(()=>{
    console.log("currentUser",currentUser)
  },[])
  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    const requestUser = async (apiToken: string) => {
   
      try {
        if (!currentUser) {
          const {data} = await getUserByToken(apiToken)
          if (data) {
            setCurrentUser(data)
          }
        }
      } catch (error) {
        console.error(error)
        if (currentUser) {
          logout()
        }
      } finally {
        setShowSplashScreen(false)
      }
    }

    if (auth && auth.api_token) {
      requestUser(auth.api_token)
    } else {
      logout()
      setShowSplashScreen(false)
    }
    // eslint-disable-next-line
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export {AuthProvider, AuthInit, useAuth}
