import { useLocale } from "../Context/LocaleContext"
import { useLoadedDataWithDOMStorage } from "../Hooks/Loader"
import { useLocalizationsLoader } from "../Context/LocalizationsLoaderContext"
import { createContext, useCallback, useContext } from "react"
import { Locale, LocalizedDataLoader } from "."

/// Localize a string using the current locale and the LocalizationsContext
/// Placeholder is used if the localization is not available
const useLocalized = (key: string, placeholder: string = "   ") =>
    useMultipleLocalizations([key], placeholder)[0] || placeholder

/// Files should be located in public/screenshot folder
const defaultScreenshotPathProvider = (locale: Locale) => `/screenshots/${locale.code}/`

export const LocalizedScreenshotPathContext = createContext(defaultScreenshotPathProvider)
/// File name encoding responsibility is left to the caller. Use encodeURIComponent method if needed
export const useLocalizedScreenshot = (fileName: string) => useContext(LocalizedScreenshotPathContext)(useLocale()) + fileName

async function loadDataSynchronously<T>(loader: LocalizedDataLoader<T> & { progress?: Promise<T> }, locale: Locale): Promise<T | undefined> {
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

export const useLocalizedData = <D, P>(placeholder: P, loader: LocalizedDataLoader<D> | undefined) => {
    const locale = useLocale()

    const callback = useCallback(
        async () => loader === undefined ? undefined : await loadDataSynchronously(loader, locale),
        [loader, locale]
    )
    const data = useLoadedDataWithDOMStorage(callback,`${loader?.key}_${locale.code}`)

    return data ?? placeholder
}

export const useMultipleLocalizations = <T>(
    keys: string[], 
    placeholder: T
) => {
    const loader = useLocalizationsLoader()
    const data = useLocalizedData(undefined, loader)
    return data ? keys.map(key => data[key] ?? placeholder) : keys.map(_ => placeholder)
}

export default useLocalized
