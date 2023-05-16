import { Suspense, lazy } from "react"
import { QRCodeProps } from "./index"

const LazyQRCode = ({ children, ref /* removing ref from props as it is not compatible with react lazy */, ...props }: QRCodeProps) => {
    const QRCode = lazy(() => import("./index"))

    return <Suspense fallback={children}>
        <QRCode {...props} />
    </Suspense>
}

export default LazyQRCode
