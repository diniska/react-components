import { ResponsiveContext } from "grommet"
import { useContext } from "react"

const isPreRendering = () => navigator.userAgent === "ReactSnap"

export const useMobile = () => {
    const size = useContext(ResponsiveContext)
    return size === "small" || size === "xsmall" || isPreRendering()
}

export const useDesktop = () => !useMobile()
