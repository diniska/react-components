import { useEffect, useState } from 'react'


export interface ScriptProps {
    type?: string
    async?: boolean
    charset?: string
    /// a url of the script
    src?: string
    /// a body of the script if needed
    content?: { id: string, body: string }
    /// whether tp keep the script in the html after the component is unmounted
    keep?: boolean
    onLoad?: () => void
}

// Ensures that there is only one such script in html
// https://stackoverflow.com/a/34425083/886703
const Script = ({src, onLoad, content, ...props}: ScriptProps) => {
    const type = props.type || "text/javascript"

    const [scriptAdded, setScriptAdded] = useState(false)
    const body = content?.body
    const contentId = content?.id

    useEffect(() => {
        if (scriptAdded) { return () => {} }
        
        const scriptId = src || contentId
        const id = "shared-components-script-" + scriptId

        const updateScript = (script: HTMLScriptElement) => {
            script.id = id
            script.type = type
    
            if (props.async) {
                script.async = props.async
            }
    
            if (props.charset) {
                script.charset = props.charset
            }
    
            if (src && script.src !== src) {
                script.src = src
            }

            if (body && script.innerHTML !== body) {
                script.innerHTML = body
            }
    
            if (onLoad) {
                script.onload = onLoad
            }
        }

        let script = document.getElementById(id) as HTMLScriptElement

        if (script === null) {
            console.info("Adding script", scriptId)
            script = document.createElement("script")
            document.body.appendChild(script)
        }

        setScriptAdded(true)

        updateScript(script)

        if (props.keep === true) {
            return () => {}
        } else {
            return () => { 
                console.info("Removing script", scriptId)
                document.body.removeChild(script)
            }
        }
    }, [src, type, props.charset, props.async, onLoad, props.keep, scriptAdded, setScriptAdded, contentId, body])
    return <></>
}

export default Script;
