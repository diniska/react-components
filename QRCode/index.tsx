import { Box, BoxExtendedProps } from "grommet"
import { QRCodeSVG } from "qrcode.react"

/// A `qrcode.react` package needs to be imported to use this component
/// https://www.npmjs.com/package/qrcode.react

export type QRCodeProps = {
    url: string,
    includeMargin?: boolean,
    size?: number, //a size of the QR code default is 128
} & BoxExtendedProps

const QRCode = ({ url, includeMargin, size, ...props }: QRCodeProps) =>
    <Box {...props}>
        <QRCodeSVG value={url} includeMargin={includeMargin} size={size} />
    </Box>

export default QRCode
