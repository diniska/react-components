import { createContext, useContext } from "react"
import { LocaleWithCode } from "../Localization"

const LocaleContext = createContext(LocaleWithCode("en"))
export const useLocale = () => useContext(LocaleContext)

export default LocaleContext
