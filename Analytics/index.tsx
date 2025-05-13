import { CSSProperties, useState } from "react"
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent"
import GoogleAnalytics from "./GoogleAnalytics"
import YandexMetrika, { YandexMetrikaProps } from "./YandexMetrika"

const isPreRendering = () => navigator.userAgent === "ReactSnap"

interface AnalyticsProps {
    /// Yandex.Metrica
    ym?: YandexMetrikaProps
    /// Google Analytics id
    gtmId?: string,
    /// When it is safe to assume that user don't need to give consent to cookies collection
    /// For example, Kazakhstan law does not require user consent to cookies collection
    forceConsent?: boolean,
    /// When to show consent request in pre-rendering mode
    /// Sometimes it can help reducing Largest Contentful Paint (LCP) metric
    /// by displaying the concent instantly.
    /// Only use this option if you can't make another content larger than consent request
    displayConsentRequestInPreRendering?: boolean
}

/// A view that makes sure that user allowed cookies collection and only then loads analytics scripts
/// You need to install `react-cookie-consent` package to use this component
const Analytics = (props: AnalyticsProps) => {
    const [consentReceived, setConsentReceived] = useState(getCookieConsentValue())

    if (isPreRendering()) {
        if (props.displayConsentRequestInPreRendering) {
            return <AnalyticsScripts {...props} />
        } else {
            return <></>
        }
    }
    
    if (consentReceived === "true" || props.forceConsent) {
        return <AnalyticsScripts {...props} />
    } else {
        return <ConsentRequest
            buttonStyle={{
                padding: "8px 16px",
                borderRadius: "8px"
            }}
            onChange={consent => setConsentReceived(consent + "") }
        />
    }
}

const ConsentRequest = ({ buttonStyle, onChange }: { buttonStyle: CSSProperties, onChange: (consentReceived: boolean) => void }) =>
    <CookieConsent
        contentStyle={{
            lineHeight: "1.2",
        }}
        enableDeclineButton
        buttonStyle={buttonStyle}
        declineButtonStyle={buttonStyle}
        onAccept={() => onChange(true)}
        onDecline={() => onChange(false)}
    >
        <span
        >
            This website uses cookies to analyze user experience and ads effectiveness.<br />
        </span>

        <span
            style={{
                lineHeight: "1.4",
                fontSize: "10px",
                display: "block",
                marginTop: "8px",
            }}
        >
            We use Google Analytics and Yandex.Metrica to collect anonymous information <b>only if you allow us to do so</b> by clicking "I understand" button.
        </span>
    </CookieConsent>

const AnalyticsScripts = ({ gtmId, ym }: AnalyticsProps) => <>
    {gtmId && <GoogleAnalytics id={gtmId} />}
    {ym && <YandexMetrika {...ym} />}
</>

export default Analytics
