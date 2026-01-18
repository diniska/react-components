export interface ImageReference {
    src: string
    type?: "image/webp" | "image/png" | "image/jpg" | string
    webp?: string
}

export interface OptimizedImageProps {
    retina1x: ImageReference
    retina2x: ImageReference
    retina3x: ImageReference
}

/// File name encoding responsibility is left to the caller. Use encodeURIComponent method if needed
const OptimizedImage = ({ alt, ...props }: OptimizedImageProps & JSX.IntrinsicElements["img"]) => {
    const densityVersions = createDensityVersions(props)
    const webpSet = createSrcSet(densityVersions, src => src.webp)
    const srcSet = createSrcSet(densityVersions, src => src.src)
    const defaultType = pictureSourceType(densityVersions.map(item => item[1]))
    return <picture>
        <source type="image/webp" srcSet={webpSet} />
        <source type={defaultType} srcSet={srcSet} />
        {/* The tag <picture> is ignored when not supported and only the tag image is used */}
        <img src={(props.retina1x.src)} srcSet={srcSet} alt={alt} {...props} />
    </picture>
}

type Density = "" | "2x" | "3x"

const createDensityVersions: (props: OptimizedImageProps) => [Density, ImageReference][] = (props) => [
    ["", props.retina1x],
    ["2x", props.retina2x],
    ["3x", props.retina3x],
]

const createSrcSet = (items: [Density, ImageReference][], src: (ref: ImageReference) => string | undefined) =>
    createUrlSet(items.map(item => [item[0], src(item[1])]))

const pictureSourceType = (srcs: ImageReference[]) => {
    const types = new Set(srcs.flatMap(src => src.type))
    return types.size === 1 
        ? types.values().next().value
        : undefined
}

const createUrlSet = (items: [Density, string | undefined][]) => items
    .filter(item => item[1])
    .map(item => [item[1]!, item[0]].join(" "))
    .join(", ")


export default OptimizedImage
