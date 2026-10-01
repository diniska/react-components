const defaultLocaleCode = "en"

export const mapExtendedLocale = (code: ExtendedLocaleCode) => {
    switch (code) {
        case "zh": return "zh-Hans"
        case "iw": return "he"
        default: return code as LocaleCode
    }
}

export const currentLocale = (navigatorLanguage: string | null | undefined = navigator.language) => {
    const components = navigatorLanguage?.split("-") ?? [defaultLocaleCode]
    const languageWithRegion = components.slice(0, 2).join("-")
    const language = components[0]

    const code = SupportedLocaleCodesWithRegions.find(code => code === languageWithRegion)
        ?? SupportedLocaleCodes.find(code => code === language) 
        ?? defaultLocaleCode

    return LocaleWithCode(code, true)
}

export type LocaleCode = "en" | "ru" | "fr" | "de" | "nb" | "nl" | "it" | "ja" | "ko" | "vi" | "sv" | "da" | "fi" | "tr" | "el" | "id" | "ms" | "th" | "hu" | "pl" | "cs" | "sk" | "uk" | "hr" | "ca" | "ro" | "he" | "af" | "hi" | "kk" | "be" | "ar"
    | "pt" | "pt-Br"
    | "es" | "es-Mx"
    | "zh-Hans" | "zh-Hant"

type ExtraLocaleCode = "zh"
    | "iw" // old version of `he`

type ExtendedLocaleCode = LocaleCode | ExtraLocaleCode

export type WritingDirection = "ltr" | "rtl"

export interface Locale {
    code: LocaleCode
    writingDirection: WritingDirection
    isDefault: boolean
}

export type Localization =  { [key: string]: string }

export interface LocalizedDataLoader<T> {
    key: string
    load: (locale: Locale) => Promise<T>
}

export type LocalizationsLoader = LocalizedDataLoader<Localization>

export const LocaleWithCode = (extendedCode: ExtendedLocaleCode, isDefault: boolean = false): Locale => {
    const code = mapExtendedLocale(extendedCode)
    return {
        code: code,
        writingDirection: ["ar", "he"].includes(code) ? "rtl" : "ltr",
        isDefault: isDefault
    }
}

const localesNames: { [key in LocaleCode]: string } = {
    "af": "Afrikaans",
    "ar": "العربية",
    "ca": "Català",
    "cs": "Čeština",
    "da": "Dansk",
    "de": "Deutsch",
    "el": "Ελληνικά",
    "en": "English",
    "fi": "Suomi",
    "fr": "Français",
    "he": "עברית",
    "hi": "हिन्दी",
    "hr": "Hrvatski",
    "hu": "Magyar",
    "id": "Indonesia",
    "it": "Italiano",
    "ja": "日本語",
    "be": "Беларуская",
    "kk": "Қазақ Тілі",
    "ko": "한국어",
    "ms": "Bahasa Melayu",
    "nb": "Norsk Bokmål",
    "nl": "Nederlands",
    "pl": "Polski",
    "ro": "Română",
    "ru": "Русский",
    "sk": "Slovenčina",
    "sv": "Svenska",
    "th": "ไทย",
    "tr": "Türkçe",
    "uk": "Українська",
    "vi": "Tiếng Việt",

    "pt": "Português",
    "pt-Br": "Portugues do Brasil",

    "es": "Español",
    "es-Mx": "Español Mexicano",

    "zh-Hans": "简体中文",
    "zh-Hant": "繁體中文"
}

export const SupportedLocaleCodes = Object.keys(localesNames).sort() as LocaleCode[]
export const SupportedExtraLocaleCodes = ["zh", "iw"] as ExtraLocaleCode[]
export const SupportedExtendedLocaleCodes = (SupportedLocaleCodes as ExtendedLocaleCode[])
    .concat(SupportedExtraLocaleCodes)
    .sort()
const SupportedLocaleCodesWithRegions = SupportedLocaleCodes.filter(code => code.includes("-"))

export const localeName = (localeCode: LocaleCode) => localesNames[localeCode]

// Example of a LocalizationsLoader assuming
// import * as loaders from "./Data"
// where Data is a folder with files named after locale codes
// and each file exports a default object with localizations as key-value pairs
//
// export const localizations = async (locale: Locale) => {
//     const loaderKey = locale.code.replace("-", "")  as keyof typeof loaders
//     const file = await (loaders[loaderKey]())
//     return file.default as { [key: string]: string }
// }
