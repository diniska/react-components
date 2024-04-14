import { LocaleCode, SupportedLocaleCodes, currentLocale, localeName } from "."

test("Losalisations translation available for all supported locales", async () => {
    SupportedLocaleCodes.forEach(locale => {
        expect(localeName(locale)).not.toBeUndefined()
        expect(localeName(locale)).not.toBe("")
    })
})

test("currentLocale correctly parses every code from supported locale codes", () => {
    SupportedLocaleCodes.forEach(locale => {
        expect(currentLocale(locale).code).toBe(locale)
    })
})

test("currentLocale correctly parses locale codes with unexpected regions", () => {
    const localeCodesWithSpecificRegions = ["ru-RU", "es-US", "kk-KZ", "zh-Hans-CN"]

    localeCodesWithSpecificRegions.forEach(locale => {
        expect(SupportedLocaleCodes.find(code => code === locale)).toBeUndefined()
        const expectedCode = locale.split("-").slice(0, -1).join("-") as LocaleCode

        const localeCode = currentLocale(locale).code
        expect(localeCode).toEqual(expectedCode)
    })
})

test("currentLocale uses en when explicitly provided null", () => {
    const locale = currentLocale(null)
    expect(locale.code).toBe("en")
})

test("currentLocale uses en for unexpected locales", () => {
    const locale = currentLocale("hello")
    expect(locale.code).toBe("en")
})

test("currentLocale uses navigator.language as a default parameter", () => {
    const locale = currentLocale()

    const possibleLocales = [
        navigator.language.split("-")[0],
        navigator.language.split("-").slice(0, 2).join("-")
    ]

    expect(possibleLocales.includes(locale.code)).toBe(true)
})

test("writing direction is rtl only for arabic and hebrew", () => {
    const rtlLocales = ["ar", "he"]
    const ltrLocales = SupportedLocaleCodes.filter(code => !rtlLocales.includes(code))

    rtlLocales.forEach(code => {
        expect(currentLocale(code).writingDirection).toBe("rtl")
    })

    ltrLocales.forEach(code => {
        expect(currentLocale(code).writingDirection).toBe("ltr")
    })
})
