import { useLocale } from "../Context/LocaleContext"
import useLoadedData from "../Hooks/Loader"
import { useLocalizationsLoader } from "../Context/LocalizationsLoaderContext"
import { createContext, useCallback, useContext } from "react"
import { Locale } from "."

/// Localize a string using the current locale and the LocalizationsContext
/// Placeholder is used if the localization is not available
const useLocalized = (key: string, placeholder: string = "   ") =>
    useMultipleLocalizations([key], placeholder)[0] || placeholder

/// Files should be located in public/screenshot folder
const defaultScreenshotPathProvider = (locale: Locale) => `/screenshots/${locale.code}/`

export const LocalizedScreenshotPathContext = createContext(defaultScreenshotPathProvider)
export const useLocalizedScreenshot = (fileName: string) => useContext(LocalizedScreenshotPathContext)(useLocale()) + fileName.split(" ").join("%20")

export const useMultipleLocalizations = <T>(
    keys: string[], 
    placeholder: T
) => {
    const locale = useLocale()
    const loader = useLocalizationsLoader()

    const data = useLoadedData(
        useCallback(
            async () => loader === undefined ? {} : await loader.load(locale),
            [loader, locale]
        ),
        `${loader?.key}_${locale.code}`
    )
    
    return data ? keys.map(key => data[key]) : keys.map(_ => placeholder)
}

export default useLocalized
