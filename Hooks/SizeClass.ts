import { ResponsiveContext, ThemeContext } from "grommet"
import { useContext } from "react"

const isPreRendering = () => navigator.userAgent === "ReactSnap"

export const useMobile = () => {
    const size = useContext(ResponsiveContext)
    const theme = useContext(ThemeContext) as { global: { breakpoints: { small: { value: number } } } }
    const smallBreakpoint = theme.global.breakpoints.small.value ?? 768
    const width = window.innerWidth // Grommet has a bug for the first rendering. It returns medium instead of small
    return width <= smallBreakpoint || size === "small" || size === "xsmall" || isPreRendering()
}

export const useDesktop = () => !useMobile()
