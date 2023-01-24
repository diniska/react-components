import { useEffect } from 'react'


export interface ScriptProps {
    type?: string,
    async?: boolean,
    charset?: string,
    src: string,
    onLoad?: () => void
}

// Ensures that there is only one such script in html
// https://stackoverflow.com/a/34425083/886703
const Script = (props: ScriptProps) => {
    const type = props.type || "text/javascript"
    useEffect(() => {
        const script = document.getElementById(props.src) as HTMLScriptElement || document.createElement("script")
        script.id = props.src
        script.type = type
        if (props.async) {
            script.async = props.async
        }
        if (props.charset) {
            script.charset = props.charset
        }
        script.src = props.src;
        document.body.appendChild(script)

        const onLoad = props.onLoad
        if (onLoad) {
            script.onload = onLoad
        }

        return () => { document.body.removeChild(script) }
    }, [props.src, type, props.charset, props.async, props.onLoad])
    return <></>
}

export default Script;
