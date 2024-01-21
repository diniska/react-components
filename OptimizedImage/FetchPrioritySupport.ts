import { HTMLAttributes } from "react"

/// Adds fetchpriority attribute to img tag in React
/// https://stackoverflow.com/a/75460919/886703

declare module "react" {
    interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
        fetchPriority?: "high" | "low" | "auto"
    }
}
