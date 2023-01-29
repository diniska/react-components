import { useEffect, useState } from "react"

const useLoadedData = <T>(load: () => Promise<T>, key = "") => {
    const [data, setData] = useState<T | undefined>(undefined)

    useEffect(() => {
        let mounted = true
        
        load().then(data => {
            if (mounted) {
                setData(data)
            }
        })
        return () => {
            mounted = false
        }
    }, [load, key])

    return data
}

export default useLoadedData
