type ImageType = "image/webp" | "image/png" | "image/jpg" | string

export interface ImageReference {
    src: string
    type?: ImageType
    webp?: string
}

export interface OptimizedImageProps {
    retina1x: ImageReference
    retina2x: ImageReference
    retina3x: ImageReference
}

const imageTypeFromSrc = (src: string): ImageType | undefined => {
    if (src.endsWith(".png")) return "image/png"
    if (src.endsWith(".jpg")) return "image/jpg"
    if (src.endsWith(".jpeg")) return "image/jpg"
    return undefined
}

/// File name encoding responsibility is left to the caller. Use encodeURIComponent method if needed
const OptimizedImage = ({ alt, ...props }: OptimizedImageProps & JSX.IntrinsicElements["img"]) => {
    const [densityVersions, imgProps] = createDensityVersions(props)
    const webpSet = createSrcSet(densityVersions, src => src.webp)
    const srcSet = createSrcSet(densityVersions, src => src.src)
    const defaultType = pictureSourceType(densityVersions.map(item => item[1]))
    return <picture>
        <source type="image/webp" srcSet={webpSet} />
        <source type={defaultType} srcSet={srcSet} />
        {/* The tag <picture> is ignored when not supported and only the tag image is used */}
        <img src={(props.retina1x.src)} srcSet={srcSet} alt={alt} {...imgProps} />
    </picture>
}

type Density = "" | "2x" | "3x"

const createDensityVersions: <Extra>(props: OptimizedImageProps & Extra) => [[Density, ImageReference][], Omit<OptimizedImageProps & Extra, keyof OptimizedImageProps>] = ({retina1x, retina2x, retina3x, ...extra}) => [
    [
        ["", retina1x],
        ["2x", retina2x],
        ["3x", retina3x],
    ],
    extra
]

const createSrcSet = (items: [Density, ImageReference][], src: (ref: ImageReference) => string | undefined) =>
    createUrlSet(items.map(item => [item[0], src(item[1])]))

const pictureSourceType = (srcs: ImageReference[]) => {
    const types = new Set(
        srcs.map(ref => ref.type || imageTypeFromSrc(ref.src))
            .filter(Boolean) // removing undefined
    )
    return types.size === 1
        ? types.values().next().value
        : undefined
}

const createUrlSet = (items: [Density, string | undefined][]) => items
    .filter(item => item[1])
    .map(item => [item[1]!, item[0]].join(" "))
    .join(", ")


export default OptimizedImage
