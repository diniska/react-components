import { LocaleCode } from '../Localization'
import { PRERENDERED_HEAD_ATTRIBUTE } from './Constants'
import SmartAppBanner, { SmartAppBannerProps } from './SmartAppBanner'

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
    keywords?: string
    locale?: LocaleCode

    facebookUrl: string
    facebookTitle: string
    facebookDescription: string
    facebookImage: string
    facebookAppId?: string
    facebookType?: string

    twitterCard?: TwitterCardMetaProps

    canonicalURL?: string
    iosSmartbanner?: SmartAppBannerProps
    noindex?: boolean
}

const PageMeta = (meta: PageMetaProps) => {
    validateMeta(meta)
    return PageMetaHelmet(meta)
}

const prerenderedHeadMarker = { [PRERENDERED_HEAD_ATTRIBUTE]: "true" }

const PageMetaHelmet = (meta: PageMetaProps) => <>
    <>
        <title {...prerenderedHeadMarker}>{meta.title}</title>
        <meta {...prerenderedHeadMarker} name="description" content={meta.description} />
        {meta.keywords && 
            <meta {...prerenderedHeadMarker} name="keywords" content={meta.keywords} />
        }
        {/* Facebook meta */}
        <meta {...prerenderedHeadMarker} property="og:url" content={meta.facebookUrl} />
        <meta {...prerenderedHeadMarker} property="og:type" content="website" />
        <meta {...prerenderedHeadMarker} property="og:title" content={meta.facebookTitle} />
        <meta {...prerenderedHeadMarker} property="og:site_name" content={meta.title} />
        <meta {...prerenderedHeadMarker} property="og:description" content={meta.facebookDescription || meta.description} />
        <meta {...prerenderedHeadMarker} property="og:image" content={absoluteImageURL(meta.baseURL, meta.facebookImage)} />
        {meta.locale &&
            <meta {...prerenderedHeadMarker} property="og:locale" content={meta.locale} />
        }
        {meta.facebookAppId &&
            <meta {...prerenderedHeadMarker} property="fb:app_id" content={meta.facebookAppId} />
        }
        {meta.facebookType &&
            <meta {...prerenderedHeadMarker} property="og:type" content={meta.facebookType} />
        }
        {meta.canonicalURL &&
            <link {...prerenderedHeadMarker} rel="canonical" href={meta.canonicalURL} />
        }
        {meta.twitterCard && <meta {...prerenderedHeadMarker} name="twitter:card" content="summary" />}
        {meta.twitterCard && <meta {...prerenderedHeadMarker} name="twitter:title" content={meta.title} />}
        {meta.twitterCard && <meta {...prerenderedHeadMarker} name="twitter:description" content={meta.description} />}
        {meta.twitterCard && <meta {...prerenderedHeadMarker} name="twitter:site" content={meta.twitterCard.site} />}
        {meta.twitterCard && meta.twitterCard.image && <meta {...prerenderedHeadMarker} name="twitter:image" content={absoluteImageURL(meta.baseURL, meta.twitterCard.image)} />}
        {meta.twitterCard && meta.twitterCard.imageAlt && <meta {...prerenderedHeadMarker} name="twitter:image:alt" content={meta.twitterCard.imageAlt} />}
        {meta.noindex === true && <meta {...prerenderedHeadMarker} name="robots" content="noindex" />}
    </>

    {meta.iosSmartbanner &&
        <SmartAppBanner {...meta.iosSmartbanner} />
    }
</>

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
        const keywords = meta.keywords?.split(",") ?? []
        if (keywords.length !== new Set(keywords).size) {
            warn(`SEO: keywords should be unique`)
        }
        const unexpectedPunctuation = [".", "–", " -", "- ", "\"", "'"].find(value => meta.keywords?.includes(value))
        if (unexpectedPunctuation !== undefined) {
            warn(`SEO: keywords should not contain punctuation except ','. '${unexpectedPunctuation}' detected in '${keywords}'`)
        }
        
        meta.keywords && checkLength("keywords", meta.keywords, 0, 255)

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
