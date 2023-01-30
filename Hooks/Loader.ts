import { useEffect, useMemo, useState } from "react"

interface Storage<T> {
    get: () => T | undefined
    set: (value: T) => void
}

// A storage that keeps data in memory
export const useInMemoryStorage = <T>(): Storage<T> => {
    const [data, setData] = useState<T | undefined>(undefined)
    return useMemo(() => ({
        get: () => data,
        set: setData
    }), [data, setData])
}

// A storage that keeps data in the DOM that helps with pre-rendering 
// and reduces the number of requests during the rehydration
export const useDOMStorage = <T>(elementId: string): Storage<T> =>
    useMemo(() => ({
        get: () => {
            const script = document.getElementById(elementId) as HTMLScriptElement
            if (script) {
                return JSON.parse(script.innerHTML)
            }
            return undefined
        },
        set: data => {
            let script = document.getElementById(elementId) as HTMLScriptElement
            if (!script) {
                script = document.createElement("script")
                document.body.appendChild(script)
                script.id = elementId
            }
            script.type = "application/json"
            script.innerHTML = JSON.stringify(data)
        }
    }), [elementId])


export const createMultilayerStorage = <T>(...storages: Storage<T>[]): Storage<T> => ({
    get: () => {
        const storagesToUpdate: Storage<T>[] = []
        for (const storage of storages) {
            const data = storage.get()

            if (data) {
                storagesToUpdate.forEach(storage => storage.set(data))
                return data
            } else {
                storagesToUpdate.push(storage)
            }
        }
        return undefined
    },
    set: data => {
        for (const storage of storages) {
            storage.set(data)
        }
    }
})

export const useLoadedDataWithStorage = <T>(load: () => Promise<T>, key = "", storage: Storage<T>) => {
    const data = storage.get()

    useEffect(() => {
        let mounted = true

        if (data === undefined) {
            load().then(data => {
                console.info(`Loaded data for ${key}`)
                if (mounted) {
                    storage.set(data)
                }
            })
        }

        return () => {
            mounted = false
        }
    }, [load, key, storage, data])

    return data
}

const useLoadedData = <T>(load: () => Promise<T>, key = "") => {
    const storage = useInMemoryStorage<T>()
    return useLoadedDataWithStorage(load, key, storage)
}

export const useLoadedDataWithDOMStorage = <T>(load: () => Promise<T>, key = "") => {
    const id = "shared-components-loader-dom-storage-" + key
    const inMemoryStorage = useInMemoryStorage<T>()
    const domStorage = useDOMStorage<T>(id)
    const storage = useMemo(() => createMultilayerStorage(inMemoryStorage, domStorage), [inMemoryStorage, domStorage])
    return useLoadedDataWithStorage(load, key, storage)
}

export default useLoadedData
