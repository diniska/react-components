import { useLocale } from "../Context/LocaleContext"
import { useLoadedDataWithDOMStorage } from "../Hooks/Loader"
import { useLocalizationsLoader } from "../Context/LocalizationsLoaderContext"
import { createContext, useCallback, useContext } from "react"
import { Locale, Localization, LocalizationsLoader } from "."

/// Localize a string using the current locale and the LocalizationsContext
/// Placeholder is used if the localization is not available
const useLocalized = (key: string, placeholder: string = "   ") =>
    useMultipleLocalizations([key], placeholder)[0] || placeholder

/// Files should be located in public/screenshot folder
const defaultScreenshotPathProvider = (locale: Locale) => `/screenshots/${locale.code}/`

export const LocalizedScreenshotPathContext = createContext(defaultScreenshotPathProvider)
/// File name encoding responsibility is left to the caller. Use encodeURIComponent method if needed
export const useLocalizedScreenshot = (fileName: string) => useContext(LocalizedScreenshotPathContext)(useLocale()) + fileName

async function loadLocalizationSynchronously(loader: LocalizationsLoader & { progress?: Promise<Localization> }, locale: Locale): Promise<Localization | undefined> {
    let progress = loader.progress
    const hasNotStarted = progress === undefined

    if (hasNotStarted) {
        progress = loader.load(locale)
        loader.progress = progress
    }

    const result = await progress

    if (hasNotStarted) {
        loader.progress = undefined
        console.info(`Loaded localizations for ${loader.key}`)
    }

    return result
}

export const useMultipleLocalizations = <T>(
    keys: string[], 
    placeholder: T
) => {
    const locale = useLocale()
    const loader = useLocalizationsLoader()

    const callback = useCallback(
        async () => loader === undefined ? {} : await loadLocalizationSynchronously(loader, locale),
        [loader, locale]
    )
    const data = useLoadedDataWithDOMStorage(callback,`${loader?.key}_${locale.code}`)
    
    return data ? keys.map(key => data[key]) : keys.map(_ => placeholder)
}

export default useLocalized
