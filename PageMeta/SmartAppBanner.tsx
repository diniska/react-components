export interface SmartAppBannerProps {
    appId: string
    appClipBundleId?: string
    argument?: string
}

/// https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/PromotingAppswithAppBanners/PromotingAppswithAppBanners.html
const SmartAppBanner = (props: SmartAppBannerProps) => (
    <meta
        name="apple-itunes-app"
        content={
            "app-id=" + props.appId
            + ((props.appClipBundleId && (", app-clip-bundle-id=" + props.appClipBundleId)) || "")
            + ((props.argument && (", app-argument=" + props.argument)) || "")
        }
    />
)

export default SmartAppBanner
