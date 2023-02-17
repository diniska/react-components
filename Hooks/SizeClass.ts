import { ResponsiveContext, ThemeContext, ThemeType } from "grommet"
import { useContext } from "react"

export type SizeClass =
    | "xsmall"
    | "small"
    | "medium"
    | "large"
    | "xlarge"
    | string;

const defaultBreakpoints: {[key: SizeClass]: number} = {
    xsmall: 400,
    small: 734,
}

const isPreRendering = () => navigator.userAgent === "ReactSnap"

// A safe version of useResponsiveContextSize() that works on the first rendering
// Grommet has a bug for the first rendering. It returns medium instead of small
export const useResponsiveContextSize = (): SizeClass => {
    const size = useContext(ResponsiveContext)
    const theme = useContext(ThemeContext) as ThemeType

    if (isPreRendering()) return "small"

    const xsmall = theme.global?.breakpoints?.xsmall?.value ?? defaultBreakpoints.xsmall
    const small = theme.global?.breakpoints?.small?.value ?? defaultBreakpoints.small
    const width = window.innerWidth

    return (
        width <= xsmall ? "xsmall"
            : width <= small ? "small"
                : size
    )
}

const mobileSizes: SizeClass[] = ["xsmall", "small"]

export const useMobile = () => mobileSizes.includes(useResponsiveContextSize())

export const useDesktop = () => !useMobile()
