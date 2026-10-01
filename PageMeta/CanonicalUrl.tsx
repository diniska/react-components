import { PRERENDERED_HEAD_ATTRIBUTE } from "./Constants"

const CanonicalUrl = ({ currentUrl, canonicalUrl }: { currentUrl: string, canonicalUrl: string }) => <>
    {canonicalUrl !== currentUrl &&
        <link {...{ [PRERENDERED_HEAD_ATTRIBUTE]: "true" }} rel="canonical" href={canonicalUrl} />
    }
</>

export default CanonicalUrl
