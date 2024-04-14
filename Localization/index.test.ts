import { SupportedLocaleCodes, localeName } from "."

test("Losalisations translation available for all supported locales", async () => {
    SupportedLocaleCodes.forEach(locale => {
        expect(localeName(locale)).not.toBeUndefined()
        expect(localeName(locale)).not.toBe("")
    })
})
