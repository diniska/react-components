import { createContext, useContext } from "react"

export interface WorldContextType {
    /// A base Url of the website
    /// The url should not end with a slash
    /// Example: "https://getchemistry.io"
    baseUrl: string
}

const WorldContext = createContext<WorldContextType>({
    baseUrl: "?"
})

const useWorld = () => useContext(WorldContext)

export const WorldProvider = WorldContext.Provider

export default useWorld


