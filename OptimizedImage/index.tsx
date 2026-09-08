type ImageType = "image/webp" | "image/png" | "image/jpeg" | string

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

const imageMimeTypes = {
    "image/png": {
        prefixes: ["data:image/png;"],
        suffixes: [".png", ".PNG"]
    },
    "image/jpeg": {
        prefixes: ["data:image/jpeg;"],
        suffixes: [".jpg", ".jpeg", ".JPG", ".JPEG"]
    }
}

const imageTypeFromSrc = (src: string): ImageType | undefined => {
    for (const [type, { prefixes, suffixes }] of Object.entries(imageMimeTypes)) {
        if (prefixes.some(prefix => src.startsWith(prefix)) || suffixes.some(suffix => src.endsWith(suffix))) {
            return type as ImageType
        }
    }
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
        {/* 
            The <picture> is ignored when not supported and only the <img> tag is used.
            Potential optimization would be to include srcSet on the <img> tag as well
            but this triggers an additional image loading as <img> has priority in the loading order
            (because how React adds it to the DOM).
            It is a trade-off between towards saving network for modern browser and displaying smaller version for browsers that don't support <picture>.
        */}
        <img src={(props.retina1x.src)} alt={alt} {...imgProps} />
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
