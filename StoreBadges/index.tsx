import React from "react"
import { Box, BoxExtendedProps, Text } from "grommet"
import styles from "./index.module.css"
import appstoreBackground from "./AppStore.png"
import googlePlaybackground from "./GooglePlay.png"
import rustoreBackground from "./RuStore.png"
import samsungGalaxyStoreBackground from "./SamsungGalaxy.png"
import useLocalized from "../Localization/hook"
import notSelectable from "../Styles/notSelectable.module.css"
import { Locale, LocalizationsLoader } from "../Localization"
import * as loaders from "./Data"
import { LocalizationLoaderProvider } from "../Context/LocalizationsLoaderContext"

interface ImageSlice {
    leading: number,
    top: number,
    trailing: number,
    bottom: number
}

export interface StoreBadgeProps {
    url: string
    background: string
    slice: ImageSlice
    analyticsClassName?: string
}

const localizationsLoader: LocalizationsLoader = {
    key: "SharedComponents.StoreBadges",
    load: async (locale: Locale) => {
        const loaderKey = locale.code.replace("-", "") as keyof typeof loaders
        const file = await (loaders[loaderKey]())
        return file.default as { [key: string]: string }
    }
}

const borderParameters = (slice: ImageSlice) => `${slice.top} ${slice.trailing} ${slice.bottom} ${slice.leading}`

const StoreBadge = ({ background, slice, url, analyticsClassName, ...props }: StoreBadgeProps & BoxExtendedProps) => <a
    href={url}
    className={[styles.reference, notSelectable.notSelectable, analyticsClassName].join(" ")}
    target="_blank"
    rel="noopener noreferrer"
>
    <LocalizationLoaderProvider loader={localizationsLoader}>
        <Box
            {...props}
            style={{
                borderImageSource: `url(${background})`,
                /* top | right | bottom | left */
                borderImageSlice: borderParameters(slice),
                borderImageWidth: borderParameters(slice),
                borderImageRepeat: "round"
            }}
            height="40px"
            border={props.border || {}}
        />
    </LocalizationLoaderProvider>
</a>

const defaultSlice: ImageSlice = {
    leading: 76,
    top: 39,
    trailing: 16,
    bottom: 39
}

const AppStoreBadgeContent = ({ store = "ios" }: { store?: "ios" | "mac"}) => <>
    <Text className={styles.message}>
        {useLocalized("AppStore.Download", "Download on the")}
    </Text>
    <Text className={styles.title}>{store === "mac" && "Mac "}App Store</Text>
</>

export const AppStoreBadge = ({ store, ...props }: { store?: "ios" | "mac" } & Pick<StoreBadgeProps, "analyticsClassName"> & Pick<StoreBadgeProps, "url"> & BoxExtendedProps) => <StoreBadge
    {...props}
    background={appstoreBackground}
    slice={defaultSlice}
>
    <Box
        className={styles.appStore}
        children={<AppStoreBadgeContent store={store}/>}
    />
</StoreBadge>

const GooglePlayBadgeContent = () => <>
    <Text className={styles.message}>{useLocalized("GooglePlay.Download", "Get it on")}</Text>
    <Text className={styles.title}>Google Play</Text>   
</>

export const GooglePlayBadge = (props: Pick<StoreBadgeProps, "analyticsClassName"> & Pick<StoreBadgeProps, "url"> & BoxExtendedProps) => <StoreBadge
    {...props}
    background={googlePlaybackground}
    slice={defaultSlice}
    className={styles.googlePlay}
    children={<GooglePlayBadgeContent />}
/>

export const RuStoreBadgeContent = () => <>
    <Text className={styles.message}>Скачайте из</Text>
    <Text className={styles.title}>RuStore</Text>
</>

export const RuStoreBadge = (props: Pick<StoreBadgeProps, "analyticsClassName"> & Pick<StoreBadgeProps, "url"> & BoxExtendedProps) => <StoreBadge
    {...props}
    background={rustoreBackground}
    slice={defaultSlice}
    className={styles.ruStore}
    children={<RuStoreBadgeContent />}
/>

export const SamsungGalaxyStoreBadgeContent = () => <>
    <Text className={styles.message}>{useLocalized("GalaxyStore.Download", "Available on")}</Text>
    <Text className={styles.title}>Galaxy Store</Text>
</>

export const SamsungGalaxyStoreBadge = (props: Pick<StoreBadgeProps, "analyticsClassName"> & Pick<StoreBadgeProps, "url"> & BoxExtendedProps) => <StoreBadge
    {...props}
    background={samsungGalaxyStoreBackground}
    slice={defaultSlice}
    className={styles.samsungGalaxyStore}
    children={<SamsungGalaxyStoreBadgeContent />}
/>

export default StoreBadge
