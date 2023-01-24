import { createContext, useContext } from "react"
import { LocalizationsLoader } from "../Localization"

const LocalizationsLoaderContext = createContext<LocalizationsLoader | undefined>(undefined)
export const useLocalizationsLoader = () => useContext(LocalizationsLoaderContext)

export default LocalizationsLoaderContext
