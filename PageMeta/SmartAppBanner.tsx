import { Helmet } from "react-helmet"

export interface SmartAppBannerProps {
    appId: string
    argument?: string
}

/// https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/PromotingAppswithAppBanners/PromotingAppswithAppBanners.html
const SmartAppBanner = (props: SmartAppBannerProps) => {
    return <Helmet>
        <meta
            name="apple-itunes-app"
            content={
                "app-id=" + props.appId
                + ((props.argument && (", app-argument=" + props.argument)) || "")
            }
        />
    </Helmet>
}

export default SmartAppBanner
