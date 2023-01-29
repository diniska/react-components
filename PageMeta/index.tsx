import React from 'react'
import Helmet from "react-helmet"

/// https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup
export interface TwitterCardMetaProps {
    /// The post headline up to 70 symbols long. 
    title: string
    /// Content description up to 200 symbols long
    description: string
    /// URL of image to use in the card. Images must be less than 5MB in size. 
    /// JPG, PNG, WEBP and GIF formats are supported.
    /// Only the first frame of an animated GIF will be used. 
    /// SVG is not supported.
    image?: string
    /// A text description of the image conveying the essential nature of an image to users who are visually impaired
    /// Maximum 420 characters.
    imageAlt?: string
    /// @username of website. Either twitter:site or twitter:site:id is required.
    site: string
}

export interface PageMetaProps {
    baseURL: string
    title: string
    description: string
    keywords: string

    facebookUrl: string
    facebookTitle: string
    facebookDescription: string
    facebookImage: string
    facebookAppId?: string

    twitterCard?: TwitterCardMetaProps

    canonicalURL?: string
    iosSmartbanner: {
        appId: string
        argument?: string
    }
}

const PageMeta = (meta: PageMetaProps) => {
    validateMeta(meta)
    return PageMetaHelmet(meta)
}

const PageMetaHelmet = (meta: PageMetaProps) => <Helmet>
    <title>{meta.title}</title>
    <meta name="description" content={meta.description} />
    <meta name="keywords" content={meta.keywords} />
    {/* Facebook meta */}
    <meta property="og:url" content={meta.facebookUrl} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={meta.facebookTitle} />
    <meta property="og:description" content={meta.facebookDescription || meta.description} />
    <meta property="og:image" content={absoluteImageURL(meta.baseURL, meta.facebookImage)} />
    {meta.facebookAppId &&
        <meta property="fb:app_id" content={meta.facebookAppId} />
    }
    {meta.canonicalURL &&
        <link rel="canonical" href={meta.canonicalURL} />
    }
    {meta.iosSmartbanner &&
        //https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/PromotingAppswithAppBanners/PromotingAppswithAppBanners.html
        <meta 
            name="apple-itunes-app" 
            content={
                "app-id=" + meta.iosSmartbanner.appId 
                + ((meta.iosSmartbanner.argument && (", app-argument=" + meta.iosSmartbanner.argument)) || "") 
            } 
        />
    }
    {meta.twitterCard && <meta name="twitter:card" content="summary" />}
    {meta.twitterCard && <meta name="twitter:title" content={meta.title} />}
    {meta.twitterCard && <meta name="twitter:description" content={meta.description} />}
    {meta.twitterCard && <meta name="twitter:site" content={meta.twitterCard.site} />}
    {meta.twitterCard && meta.twitterCard.image && <meta name="twitter:image" content={absoluteImageURL(meta.baseURL, meta.twitterCard.image)} />}
    {meta.twitterCard && meta.twitterCard.imageAlt && <meta name="twitter:image:alt" content={meta.twitterCard.imageAlt} />}
</Helmet>

function validateMeta(meta: PageMetaProps) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        const warn = console.warn
        const checkLength = (name: string, value: string, min: number, max: number) => {
            const length = value.length
            if (0 < min && length < min) {
                warn(`SEO: ${name} should be at least ${min} symbols. Currently ${length}`)
            } else if (length > max) {
                warn(`SEO: ${name} should be shorter than ${max} symbols. Currently ${length}`)
            }
        }
        checkLength("description", meta.description, 70, 160)
        checkLength("title", meta.title, 35, 70)
        const keywords = meta.keywords.split(",")
        if (keywords.length !== new Set(keywords).size) {
            warn(`SEO: keywords should be unique`)
        }
        const unexpectedPunctuation = [".", "–", " -", "- ", "\"", "'"].find(value => meta.keywords.includes(value))
        if (unexpectedPunctuation !== undefined) {
            warn(`SEO: keywords should not contain punctuation except ','. '${unexpectedPunctuation}' detected in '${keywords}'`)
        }
        checkLength("keywords", meta.keywords, 0, 255)
        if (meta.description === meta.title) {
            warn("SEO: page description should be different from page title")
        }
        const twitterCard = meta.twitterCard
        if (twitterCard) {
            checkLength("twitter title", twitterCard.title, 0, 70)
            checkLength("twitter description", twitterCard.description, 0, 200)
        }
    }
}

const absoluteImageURL = (baseURL: string, url: string) => url.match(/^\//g) ? `${baseURL}${url}` : url

export default PageMeta
