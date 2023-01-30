import { useEffect, useState } from 'react'


export interface ScriptProps {
    type?: string
    async?: boolean
    charset?: string
    src: string
    /// whether tp keep the script in the html after the component is unmounted
    keep?: boolean
    onLoad?: () => void
}

// Ensures that there is only one such script in html
// https://stackoverflow.com/a/34425083/886703
const Script = ({src, onLoad, ...props}: ScriptProps) => {
    const type = props.type || "text/javascript"

    const [scriptAdded, setScriptAdded] = useState(false)

    useEffect(() => {
        if (scriptAdded) { return () => {} }

        const id = "shared-components-script-" + src

        const updateScript = (script: HTMLScriptElement) => {
            script.id = id
            script.type = type
    
            if (props.async) {
                script.async = props.async
            }
    
            if (props.charset) {
                script.charset = props.charset
            }
    
            if (script.src !== src) {
                script.src = src
            }
    
            if (onLoad) {
                script.onload = onLoad
            }
        }

        let script = document.getElementById(id) as HTMLScriptElement

        if (script === null) {
            console.info("Adding script", src)
            script = document.createElement("script")
            document.body.appendChild(script)
        }

        setScriptAdded(true)

        updateScript(script)

        if (props.keep === true) {
            return () => {}
        } else {
            return () => { 
                console.info("Removing script", src)
                document.body.removeChild(script)
            }
        }
    }, [src, type, props.charset, props.async, onLoad, props.keep, scriptAdded, setScriptAdded])
    return <></>
}

export default Script;
