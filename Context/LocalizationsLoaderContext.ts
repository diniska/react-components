import { createContext, useContext } from "react"
import { LocalizationsLoader } from "../Localization"

const LocalizationsLoaderContext = (() => {
    console.log("Creating LocalizationsLoaderContext")
    return createContext<LocalizationsLoader | undefined>(undefined)
})()
export const useLocalizationsLoader = () => useContext(LocalizationsLoaderContext)

export default LocalizationsLoaderContext
