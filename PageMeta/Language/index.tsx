import { useEffect } from "react"

const usePageMetaLang = (lang: string) => {
    useEffect(() => {
        document.documentElement.lang = lang
    }, [lang])
}

const PageMetaLang = ({ lang }: { lang: string }) => <>{
    usePageMetaLang(lang)
}</>

export default PageMetaLang
