export const currentLocale = () => {
    const userLang = navigator.language?.split("-")[0]
    const code = SupportedLocaleCodes.find(locale => userLang === locale) ?? "en"
    return LocaleWithCode(code)
}

export type LocaleCode = "en" | "ru" | "fr" | "es" | "de" | "zh" | "nb" | "nl" | "pt" | "it" | "ja" | "ko" | "vi" | "sv" | "da" | "fi" | "tr" | "el" | "id" | "ms" | "th" | "hu" | "pl" | "cs" | "sk" | "uk" | "hr" | "ca" | "ro" | "he" | "af" | "hi" | "kk" | "ar"
export type WritingDirection = "ltr" | "rtl"

export interface Locale {
    code: LocaleCode
    writingDirection: WritingDirection
}

export interface LocalizationsLoader {
    key: string
    load: (locale: Locale) => Promise<{[key: string]: string}>
}

export const LocaleWithCode = (code: LocaleCode): Locale => ({
    code: code,
    writingDirection: ["ar", "he"].includes(code) ? "rtl" : "ltr"
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
    "es": "Español",
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
    "pt": "Português",
    "ro": "Română",
    "ru": "Русский",
    "sk": "Slovenčina",
    "sv": "Svenska",
    "th": "ไทย",
    "tr": "Türkçe",
    "uk": "Українська",
    "vi": "Tiếng Việt",
    "zh": "简体中文",
}

export const SupportedLocaleCodes = Object.keys(localesNames).sort() as LocaleCode[]

export const localeName = (localeCode: LocaleCode) => localesNames[localeCode]

// Exampple of a LocalizationsLoader assuming
// import * as loaders from "./Data"
// where Data is a folder with files named after locale codes
// and each file exports a default object with localizations as key-value pairs
//
// export const localizations = async (locale: Locale) => {
//     const loaderKey = locale.code as keyof typeof loaders
//     const file = await (loaders[loaderKey]())
//     return file.default as { [key: string]: string }
// }
