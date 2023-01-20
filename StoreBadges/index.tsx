import React from "react"
import { Box, BoxExtendedProps, Text } from "grommet"
import styles from "./index.module.css"
import appstoreBackground from "./AppStore.png"
import googlePlaybackground from "./GooglePlay.png"
import useLocalized from "../Localization/hook"
import notSelectable from "../Styles/notSelectable.module.css"
import LocalizationsLoaderContext from "../Context/LocalizationsLoaderContext"
import { Locale, LocalizationsLoader } from "../Localization"
import * as loaders from "./Data"

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
}

const localizationsLoader: LocalizationsLoader = {
    key: "SharedComponents.StoreBadges",
    load: async (locale: Locale) => {
        const loaderKey = locale.code as keyof typeof loaders
        const file = await (loaders[loaderKey]())
        return file.default as { [key: string]: string }
    }
}

const borderParameters = (slice: ImageSlice) => `${slice.top} ${slice.trailing} ${slice.bottom} ${slice.leading}`

const StoreBadge = ({ background, slice, url, ...props }: StoreBadgeProps & BoxExtendedProps) => <a
    href={url}
    className={[styles.reference, notSelectable.notSelectable].join(" ")}
>
    <LocalizationsLoaderContext.Provider value={localizationsLoader}>
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
    </LocalizationsLoaderContext.Provider>
</a>

const defaultSlice: ImageSlice = {
    leading: 76,
    top: 39,
    trailing: 16,
    bottom: 39
}

const AppStoreBadgeContent = () => <>
    <Text className={styles.message}>
        {useLocalized("AppStore.Download", "Download on the")}
    </Text>
    <Text className={styles.title}>App Store</Text>
</>

export const AppStoreBadge = (props: Pick<StoreBadgeProps, "url"> & BoxExtendedProps) => <StoreBadge
    {...props}
    background={appstoreBackground}
    slice={defaultSlice}
>
    <Box
        className={styles.appStore}
        children={<AppStoreBadgeContent />}
    />
</StoreBadge>

const GooglePlayBadgeContent = () => <>
    <Text className={styles.message}>{useLocalized("GooglePlay.Download", "Get it on")}</Text>
    <Text className={styles.title}>Google Play</Text>   
</>

export const GooglePlayBadge = (props: Pick<StoreBadgeProps, "url"> & BoxExtendedProps) => <StoreBadge
    {...props}
    background={googlePlaybackground}
    slice={defaultSlice}
    className={styles.googlePlay}
    children={<GooglePlayBadgeContent />}
/>

export default StoreBadge
