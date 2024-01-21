import { AriaAttributes, DOMAttributes } from "react"

/// Adds fetchpriority attribute to img tag in React
/// https://stackoverflow.com/a/74899929/886703

export type FetchPriority = "high" | "low" | "auto"

declare module "react" {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        fetchPriority?: FetchPriority
    }
}
