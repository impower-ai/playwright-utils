import { Locator } from "@playwright/test";

export async function isLocatorAttached(locator: Locator): Promise<boolean> {
    return await locator.waitFor({ state: 'attached', timeout: 250 })
        .then(() => true)
        .catch(() => false);
}
