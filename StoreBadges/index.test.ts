import { SupportedLocaleCodes } from "../Localization"
import * as loaders from "./Data"

test("Losalisations available for all supported locales", async () => {
    SupportedLocaleCodes.forEach(async locale => {
        const key = locale.replace("-", "")  as keyof typeof loaders
        const loadLocalizations = loaders[key]
        expect(loadLocalizations).not.toBeUndefined()
        return await expect(loadLocalizations()).resolves.not.toBeUndefined()
    })
})
