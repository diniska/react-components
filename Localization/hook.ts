import { useLocale } from "../Context/LocaleContext"
import useLoadedData from "../Hooks/Loader"
import { useLocalizationsLoader } from "../Context/LocalizationsLoaderContext"
import { useCallback } from "react"

/// Localize a string using the current locale and the LocalizationsContext
/// Placeholder is used if the localization is not available
const useLocalized = (key: string, placeholder: string = "   ") =>
    useMultipleLocalizations([key], placeholder)[0] || placeholder

/// Files should be located in public/screenshot folder
export const useLocalizedScreenshot = (fileName: string) => `/screenshots/${useLocale().code}/${fileName.split(" ").join("%20")}`

export const useMultipleLocalizations = <T>(
    keys: string[], 
    placeholder: T
) => {
    const locale = useLocale()
    const loader = useLocalizationsLoader()

    const data = useLoadedData(useCallback(async () => {
        if (loader === undefined) {
            console.warn("Localizations are not available")
            return {}
        } else {
            console.info("Loading localizations for", locale.code)
            return await loader.load(locale)
        }
    }, [loader, locale]), `${loader?.key}_${locale.code}`)
    
    if (data) {
        return keys.map(key => data[key])
    } else {
        return keys.map(_ => placeholder)
    }
}

export default useLocalized
