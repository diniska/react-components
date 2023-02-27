import { localeName, SupportedLocaleCodes } from "../Localization"
import * as loaders from "./Data"

test("Losalisations translation available for all supported locales", async () => {
    SupportedLocaleCodes.forEach(locale => {
        expect(localeName(locale)).not.toBeUndefined()
    })
})

test("Losalisations available for all supported locales", async () => {
    SupportedLocaleCodes.forEach(async locale => {
        const key = locale.replace("-", "")  as keyof typeof loaders
        const loadLocalizations = loaders[key]
        return await expect(loadLocalizations()).resolves.not.toBeUndefined()
    })
})
