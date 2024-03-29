export interface ImageReference {
    src: string
    webp?: string
}

export interface OptimizedImageProps {
    retina1x: ImageReference
    retina2x: ImageReference
    retina3x: ImageReference
}

/// File name encoding responsibility is left to the caller. Use encodeURIComponent method if needed
const OptimizedImage = ({ retina1x, retina2x, retina3x, alt, ...props }: OptimizedImageProps & JSX.IntrinsicElements["img"]) => {
    const webpSet = createWebPSet([["", retina1x], ["2x", retina2x], ["3x", retina3x]])
    const srcSet = createSrcSet([["", retina1x], ["2x", retina2x], ["3x", retina3x]])
    return <picture>
        <source type="image/webp" srcSet={webpSet} />
        <source srcSet={srcSet} />
        {/* The tag <picture> is ignored when not supported and only the tag image is used */}
        <img src={(retina1x.src)} srcSet={srcSet} alt={alt} {...props} />
    </picture>
}

type Density = "" | "2x" | "3x"

const createWebPSet = (items: [Density, ImageReference][]) =>
    createUrlSet(items.map(item => [item[0], item[1].webp]))

const createSrcSet = (items: [Density, ImageReference][]) =>
    createUrlSet(items.map(item => [item[0], item[1].src]))

const createUrlSet = (items: [Density, string | undefined][]) => items
    .filter(item => item[1])
    .map(item => [item[1]!, item[0]].join(" "))
    .join(", ")


export default OptimizedImage
