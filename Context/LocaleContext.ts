import { createContext, useContext } from "react"
import { currentLocale } from "../Localization"

const LocaleContext = createContext(currentLocale())
export const useLocale = () => useContext(LocaleContext)

export default LocaleContext
