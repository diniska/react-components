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
const Analytics = (props: AnalyticsProps) => <>{
    isPreRendering() ||
    <>
        <ConcentRequest />
        {
            getCookieConsentValue() && <AnalyticsScripts {...props} />
        }
    </>
}</>

const ConcentRequest = () => {

    const buttonStyle = {
        padding: "8px 16px",
        borderRadius: "8px"
    }

    return <CookieConsent
        enableDeclineButton
        buttonStyle={buttonStyle}
        declineButtonStyle={buttonStyle}
    >
        This website uses cookies to analyze user experience and ads effectiveness.
        <span
            style={{
                fontSize: "10px",
                lineHeight: "5px",
            }}
        >
            We use Google Analytics and Yandex.Metrica to collect anonymous information <b>only if you allow us to do so</b> by clicking "I understand" button.
        </span>
    </CookieConsent>
}

const AnalyticsScripts = ({ gtmId, ym }: AnalyticsProps) => <>
    {gtmId && <GoogleAnalytics id={gtmId} />}
    {ym && <YandexMetrika {...ym} />}
</>

export default Analytics
