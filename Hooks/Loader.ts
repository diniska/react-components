import { useEffect, useState } from "react"

const useLoadedData = <T>(load: () => Promise<T>, key = "") => {
    const [data, setData] = useState<T | undefined>(undefined)

    useEffect(() => {
        let mounted = true
        console.info("Loading data for", key)
        
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
