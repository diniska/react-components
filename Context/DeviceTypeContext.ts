import { createContext, useContext } from "react"

interface DeviceType {
    type: "iPhone" | "iPad" | "Android" | "unknown"
    iOS: boolean
    Android: boolean
    // Whether AppStore or GooglePlay available on the device
    storeAvailable: boolean
}

function currentDeviceType(): DeviceType {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera

    if (/iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
        return { type: "iPhone", iOS: true, Android: false, storeAvailable: true }
    } else if (/iPad/.test(userAgent) && !(window as any).MSStream) { 
        return { type: "iPad", iOS: true, Android: false, storeAvailable: true }
    } else if (/android/i.test(userAgent)) {
        return { type: "Android", iOS: false, Android: true, storeAvailable: true }
    } else {
        return { type: "unknown", iOS: false, Android: false, storeAvailable: false }
    }
}

// A react context that provides the current device type (iPhone, iPad, Android or somethign else) to all components.
//
// The device type is determined by the user agent string.

const DeviceTypeContext = createContext(currentDeviceType())

export const useDeviceType = () => useContext(DeviceTypeContext)

export default DeviceTypeContext
