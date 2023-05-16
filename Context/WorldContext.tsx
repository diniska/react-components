import { createContext, useContext } from "react"

export interface WorldContextType {
    /// A base Url of the website
    /// The url should not end with a slash
    /// Example: "https://getchemistry.io"
    baseUrl: string,
    /// An identifier of click through tracking if any
    clickThroughId?: string,
}

const WorldContext = createContext<WorldContextType>({
    baseUrl: "?"
})

const useWorld = () => useContext(WorldContext)

export const WorldProvider = WorldContext.Provider

export const WorldValueProvider = (props: { value: Partial<WorldContextType>, children: React.ReactNode }) => 
    <WorldValueModifier transform={world => ({ ...world, ...props.value })} children={props.children} />

export const WorldValueModifier = (props: { transform: (world: WorldContextType) => WorldContextType, children: React.ReactNode }) => {
    const world = useWorld()
    return <WorldProvider value={props.transform(world)} children={props.children} />
}

export default useWorld
