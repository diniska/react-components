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
    
    if (current?.loaders[loaderKey] === undefined) {
        console.error("Localization loader with key " + loaderKey + " is not registered")
    }

    return <LocalizationsLoaderContext.Provider value={{
        currentKey: loaderKey, 
        loaders: current?.loaders ?? {}
    }} children={children} />
}
