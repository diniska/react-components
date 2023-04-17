import { CSSProperties, useState } from "react"
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent"
import GoogleAnalytics from "./GoogleAnalytics"
import YandexMetrika, { YandexMetrikaProps } from "./YandexMetrika"

const isPreRendering = () => navigator.userAgent === "ReactSnap"

interface AnalyticsProps {
    /// Yandex.Metrica
    ym?: YandexMetrikaProps
    /// Google Analytics id
    gtmId?: string
}

/// A view that makes sure that user allowed cookies collection and only then loads analytics scripts
/// You need to install `react-cookie-consent` package to use this component
const Analytics = (props: AnalyticsProps) => {
    const [consentReceived, setConsentReceived] = useState(getCookieConsentValue() !== undefined)

    if (isPreRendering()) {
        return <></>
    }

    return <>
        <ConsentRequest
            buttonStyle={{
                padding: "8px 16px",
                borderRadius: "8px"
            }}
            onChange={setConsentReceived}
        />
        {
            consentReceived && <AnalyticsScripts {...props} />
        }
    </>
}

const ConsentRequest = ({ buttonStyle, onChange }: { buttonStyle: CSSProperties, onChange: (consentReceived: boolean) => void }) =>
    <CookieConsent
        enableDeclineButton
        buttonStyle={buttonStyle}
        declineButtonStyle={buttonStyle}
        onAccept={() => onChange(true)}
        onDecline={() => onChange(false)}
    >
        This website uses cookies to analyze user experience and ads effectiveness.<br/>
        <span
            style={{
                fontSize: "10px",
                lineHeight: "5px",
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
