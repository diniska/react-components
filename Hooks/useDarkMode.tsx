import { useCallback, useEffect, useState } from "react"

export type Mode = "dark" | "light"

const currentModeMatch = window.matchMedia('(prefers-color-scheme: dark)')
const currentMode = (): Mode => currentModeMatch.matches ? "dark" : "light"

const useDarkMode = (): Mode => {
    const [mode, setMode] = useState(currentMode())

    const listener = useCallback(() => {
        const newMode = currentMode()
        if (mode !== newMode) {
            setMode(newMode);
            console.log("Changing mode to ", newMode)
        }
    }, [mode, setMode])

    useEffect(() => addChangeListener(currentModeMatch, listener), [listener])

    return mode
}

const addChangeListener = (query: MediaQueryList, listener: VoidFunction) => {
    const eventType = "change"
    
    if (query.addEventListener !== undefined) {
        query.addEventListener(eventType, listener)
        return () => query.removeEventListener(eventType, listener)
    } else {
        // Supporting Safari before iOS 14 by using deprecated addListener and removeListener methods
        // https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/addListener
        query.addListener(listener)
        return () => query.removeListener(listener)
    }
}

export default useDarkMode
