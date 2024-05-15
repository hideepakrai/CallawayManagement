 
/* eslint-disable react-refresh/only-export-components */
import {createContext, useContext, useEffect, useState} from 'react'
import {ThemeModeComponent} from '../../../assets/ts/layout'
import {toAbsoluteUrl} from '../../../helpers'
import { Carousel } from 'react-bootstrap'

export type ThemeModeType = 'dark' | 'light' | 'system'
export const themeModelSKey = 'kt_theme_mode_value'
export const themeMenuModeLSKey = 'kt_theme_mode_menu'

const systemMode = ThemeModeComponent.getSystemMode() as 'light' | 'dark'

type ThemeModeContextType = {
  mode: ThemeModeType
  menuMode: ThemeModeType
  updateMode: (_mode: ThemeModeType) => void
  updateMenuMode: (_mode: ThemeModeType) => void
}

// const themeModeSwitchHelper = (_mode: ThemeModeType) => {

//   const mode = _mode !== 'system' ? _mode : systemMode
//   const imageUrl = 'media/patterns/header-bg' + (mode === 'light' ? '.png' : '-dark.jpg')
//   document.body.style.backgroundImage = `url("${toAbsoluteUrl(imageUrl)}")`
// }

const themeModeSwitchHelper = (_mode: ThemeModeType) => {
  // You can remove this function as it's not needed anymore
}

<div className="cway-banner">
  <Carousel >
  {/* autoplay autoplaySpeed={3000} */}
    <div className="gx-slider-1 ">
      <div className='prodect-image'>
        <img src="https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/uploads/image_3_2_3d5fa0ef7f.png" alt="Banner One"></img>
      </div>
    </div>
    <div className='prodect-image'>
      <img src="https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/uploads/2024_01_03_CG_Paradym_Ai_Smoke_Driver_Intro_Banner_2560x1000_1_9a9c1b0fdc.png" alt="Banner Two"></img>
    </div>
    <div className='prodect-image'>
      <img src="https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/uploads/callaway_img1_1_3_bd66b91a82.png" alt="Banner Three"></img>
    </div>
  </Carousel>
</div>


const getThemeModeFromLocalStorage = (lsKey: string): ThemeModeType => {
  if (!localStorage) {
    return 'light'
  }

  const data = localStorage.getItem(lsKey)
  if (data === 'dark' || data === 'light' || data === 'system') {
    return data
  }

  if (document.documentElement.hasAttribute('data-bs-theme')) {
    const dataTheme = document.documentElement.getAttribute('data-bs-theme')
    if (dataTheme && (dataTheme === 'dark' || dataTheme === 'light' || dataTheme === 'system')) {
      return dataTheme
    }
  }

  return 'system'
}

const defaultThemeMode: ThemeModeContextType = {
  mode: getThemeModeFromLocalStorage(themeModelSKey),
  menuMode: getThemeModeFromLocalStorage(themeMenuModeLSKey),
  updateMode: (_mode: ThemeModeType) => {},
  updateMenuMode: (_menuMode: ThemeModeType) => {},
}

const ThemeModeContext = createContext<ThemeModeContextType>({
  mode: defaultThemeMode.mode,
  menuMode: defaultThemeMode.menuMode,
  updateMode: (_mode: ThemeModeType) => {},
  updateMenuMode: (_menuMode: ThemeModeType) => {},
})

const useThemeMode = () => useContext(ThemeModeContext)

const ThemeModeProvider = ({children}: {children: React.ReactNode}) => {
  const [mode, setMode] = useState<ThemeModeType>(defaultThemeMode.mode)
  const [menuMode, setMenuMode] = useState<ThemeModeType>(defaultThemeMode.menuMode)

  const updateMode = (_mode: ThemeModeType, saveInLocalStorage: boolean = true) => {
    setMode(_mode)
    // themeModeSwitchHelper(updatedMode)
    if (saveInLocalStorage && localStorage) {
      localStorage.setItem(themeModelSKey, _mode)
    }

    if (saveInLocalStorage) {
      const updatedMode = _mode === 'system' ? systemMode : _mode
      document.documentElement.setAttribute('data-bs-theme', updatedMode)
    }
    ThemeModeComponent.init()
  }

  const updateMenuMode = (_menuMode: ThemeModeType, saveInLocalStorage: boolean = true) => {
    setMenuMode(_menuMode)
    if (saveInLocalStorage && localStorage) {
      localStorage.setItem(themeMenuModeLSKey, _menuMode)
    }
  }

  useEffect(() => {
    updateMode(mode, false)
    updateMenuMode(menuMode, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
   
    


    
    <ThemeModeContext.Provider value={{mode, menuMode, updateMode, updateMenuMode}}>
      {children}
    </ThemeModeContext.Provider>
  )
}

export {ThemeModeProvider, useThemeMode, systemMode, themeModeSwitchHelper}
