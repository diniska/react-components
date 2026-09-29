import { createContext, useContext } from "react"

export interface AnalyticsContextType {
    cookieConsentVisible: boolean
}

const AnalyticsContext = createContext<AnalyticsContextType>({cookieConsentVisible: false})
export const useAnalyticsContext = () => useContext(AnalyticsContext)

export default AnalyticsContext
