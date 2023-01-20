import React, { useContext } from 'react'
import { Box, BoxProps, ResponsiveContext } from 'grommet'

const Content = (props: BoxProps & JSX.IntrinsicElements['div']) => (
    <Box
        style={styleForSize(useContext(ResponsiveContext))}
        {...props}
    />
)

/// Displays text paragraph that is easy to read
const ReadableArea = (props: BoxProps & JSX.IntrinsicElements['div']) => (
    <Box
        direction="column"
        fill="horizontal"
        align="center"
    >
        <Content {...props}/>
    </Box>
)

function styleForSize(size: string): { width: string } {
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

export default ReadableArea
