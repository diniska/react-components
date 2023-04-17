import Script from "../Script"

declare global {
    interface Window {
        dataLayer: any[]
    }
}

interface GoogleAnalyticsProps {
    id: string
}

const GoogleAnalytics = ({ id }: GoogleAnalyticsProps) => <Script
    async
    keep
    src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
    onLoad={() => {
        window.dataLayer = window.dataLayer || []
        const gtag = (...args: any[]) => window.dataLayer.push(args)
        gtag("js", new Date())
        gtag("config", id)
    }}
/>

export default GoogleAnalytics
