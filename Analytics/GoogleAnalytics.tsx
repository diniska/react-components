import Script from "../Script"

interface GoogleAnalyticsProps {
    id: string
}

const GoogleAnalytics = ({ id }: GoogleAnalyticsProps) => {
    const googleAnalyticsScript = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag("js", new Date());
    gtag("config", "${id}");
    `
    return <>
        <Script
            async
            keep
            src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        />
        <Script 
            keep
            content={{ 
                id: "google-analytics-setup", 
                body: googleAnalyticsScript 
            }}
        />
    </>
}

export default GoogleAnalytics
