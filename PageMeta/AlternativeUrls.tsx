import { Helmet } from "react-helmet"
import { SupportedLocaleCodes } from "../Localization"
import useWorld from "../Context/WorldContext"

// Adds all localized versions of the urls to the page head
// For example, if the page is opened at https://getchemistry.io/en/reactions/?search=H2O
// and specified pathSuffix is `reactions/?search=H2O`
// then the following links will be added to the head:
// `<link rel="alternate" hrefLang="x-default" href="https://getchemistry.io/reactions/?search=H2O" />`,
// `<link rel="alternate" hrefLang="ru" href="https://getchemistry.io/ru/reactions/?search=H2O" />`,
// `<link rel="alternate" hrefLang="en" href="https://getchemistry.io/en/reactions/?search=H2O" />`, etc.
// The baseUrl is taken from useWorld hook
const AlternativeUrls = ({ pathSuffix }: { pathSuffix: string }) => {
    const baseUrl = useWorld().baseUrl
    return <Helmet>
        <link rel="alternate" hrefLang="x-default" href={baseUrl + "/" + pathSuffix} />
        {SupportedLocaleCodes.map(code =>
            <link key={code} rel="alternate" hrefLang={code} href={`${baseUrl}/${code}/${pathSuffix}`} />
        )}
    </Helmet>
}

export default AlternativeUrls
