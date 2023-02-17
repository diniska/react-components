import { Box, BoxProps } from 'grommet'
import { useLocale } from '../Context/LocaleContext'
import { WritingDirection } from '../Localization'
import { SizeClass, useResponsiveContextSize } from '../Hooks/SizeClass'

// MARK: - Private methods for calculating style

function styleForSize(size: SizeClass): React.CSSProperties {
    // width 87.5% (max-width: 734px)
    // width 692 (max-width:1068px)
    // width 980
    switch (size) {
        case "xsmall":
        case "small":
            return { width: "87.5%" }
        case "medium":
            return { width: "692px" }
        default:
            return { width: "980px" }
    }
}

// A method that returns a stile of an object that has the same offset from the leading edge as styleForSize returns but doesn't have offset from the right
function styleForSizeLeading(size: string, direction: WritingDirection): React.CSSProperties {
    let margin: string

    switch (size) {
        case "xsmall":
        case "small":
            margin = "6.25%"
            break
        case "medium":
            margin = "calc(50% - 346px)"
            break
        default:
            margin = "calc(50% - 490px)"
    }

    switch (direction) {
        case "rtl":
            return { marginRight: margin }
        case "ltr":
            return { marginLeft: margin }
    }
}

const useStyle = () => styleForSize(useResponsiveContextSize())
const useStyleLeading = () => styleForSizeLeading(useResponsiveContextSize(), useLocale().writingDirection)

// MARK - Readable Area

const Content = ({ style, ...props }: BoxProps & JSX.IntrinsicElements["div"]) =>
    <Box style={{ ...useStyle(), ...style }} {...props} />


/// Displays text paragraph that is easy to read
const ReadableArea = (props: BoxProps & JSX.IntrinsicElements["div"]) => (
    <Box
        direction="column"
        fill="horizontal"
        align="center"
    >
        <Content {...props} />
    </Box>
)

// MARK: - Readable area for leading edge

const ContentLeading = ({ style, ...props }: BoxProps & JSX.IntrinsicElements["div"]) =>
    <Box style={{...useStyleLeading(), ...style}} {...props}/>

// Displays the text paragraph that is easy to read and is offset from the leading edge
export const ReadableAreaLeading = (props: BoxProps & JSX.IntrinsicElements["div"]) => (
    <Box
        direction="column"
        fill="horizontal"
        align="start"
    >
        <ContentLeading {...props} />
    </Box>
)

export default ReadableArea
