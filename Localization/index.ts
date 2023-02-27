export const currentLocale = () => {
    const userLang = navigator.language?.split("-")[0]
    const code = SupportedLocaleCodes.find(locale => userLang === locale) ?? "en"
    return LocaleWithCode(code, true)
}

export type LocaleCode = "en" | "ru" | "fr" | "de" | "nb" | "nl" | "it" | "ja" | "ko" | "vi" | "sv" | "da" | "fi" | "tr" | "el" | "id" | "ms" | "th" | "hu" | "pl" | "cs" | "sk" | "uk" | "hr" | "ca" | "ro" | "he" | "af" | "hi" | "kk" | "ar"
    | "pt" | "pt-Br"
    | "es" | "es-Mx"
    | "zh" | "zh-Hans" | "zh-Hant"

export type WritingDirection = "ltr" | "rtl"

export interface Locale {
    code: LocaleCode
    writingDirection: WritingDirection
    isDefault: boolean
}

export interface LocalizationsLoader {
    key: string
    load: (locale: Locale) => Promise<{ [key: string]: string }>
}

export const LocaleWithCode = (code: LocaleCode, isDefault: boolean = false): Locale => ({
    code: code,
    writingDirection: ["ar", "he"].includes(code) ? "rtl" : "ltr",
    isDefault: isDefault
})

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

    "zh": "简体中文",
    "zh-Hans": "简体中文",
    "zh-Hant": "繁體中文"
}

export const SupportedLocaleCodes = Object.keys(localesNames).sort() as LocaleCode[]

export const localeName = (localeCode: LocaleCode) => localesNames[localeCode]

// Exampple of a LocalizationsLoader assuming
// import * as loaders from "./Data"
// where Data is a folder with files named after locale codes
// and each file exports a default object with localizations as key-value pairs
//
// export const localizations = async (locale: Locale) => {
//     const loaderKey = locale.code.replace("-", "")  as keyof typeof loaders
//     const file = await (loaders[loaderKey]())
//     return file.default as { [key: string]: string }
// }
