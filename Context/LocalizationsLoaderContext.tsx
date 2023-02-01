import { createContext, PropsWithChildren, useContext } from "react"
import { LocalizationsLoader } from "../Localization"

interface LocalizationsLoaderSet {
    currentKey: string
    loaders: { [key: string]: LocalizationsLoader }
}

const LocalizationsLoaderContext = createContext<LocalizationsLoaderSet | undefined>(undefined)

export const useLocalizationsLoader = (key?: string) => {
    let context = useContext(LocalizationsLoaderContext)
    if (context === undefined) {
        return undefined
    } else {
        return context.loaders[key ?? context.currentKey]
    }
}

export const LocalizationLoaderProvider = ({ children, loader }: PropsWithChildren<{ loader: LocalizationsLoader }>) => {
    const current = useContext(LocalizationsLoaderContext)
    return <LocalizationsLoaderContext.Provider value={{
        currentKey: loader.key,
        loaders: { ...(current?.loaders ?? {}), [loader.key]: loader }
    }} children={children} />
}

export const SwitchLocalizationLoader = ({ children, loaderKey }: PropsWithChildren<{ loaderKey: string }>) => {
    const current = useContext(LocalizationsLoaderContext)

    if (!current) {
        console.error(`Localization loader with key ${loaderKey} is not registered`)
        return <>{children}</>
    }

    if (current.currentKey === loaderKey) {
        return <>{children}</>
    }

    if (!current.loaders[loaderKey]) {
        console.error(`Localization loader with key ${loaderKey} is not registered`)
        return <>{children}</>
    } else {
        const value = {
            currentKey: loaderKey,
            loaders: current.loaders
        }
        return <LocalizationsLoaderContext.Provider value={value} children={children}/>
    }
}
