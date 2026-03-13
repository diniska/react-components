import { useMemo } from "react"

export const useAndroid = () => useMemo(() => {
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera
    return /android/i.test(ua)
}, [])

export const useIOS = () => useMemo(() => {
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera
    return /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream
}, [])

export const useIPhone = () => useMemo(() => {
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera
    console.log("User agent: ", ua)
    return /iPhone/.test(ua) && !(window as any).MSStream
}, [])
