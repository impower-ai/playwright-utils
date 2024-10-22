import { Locator, Page } from "@playwright/test";

export abstract class BaseObject {

    public constructor(
        protected readonly page: Page
    ) {}
    
    protected async isLocatorAttached(locator: Locator): Promise<boolean> {
        return await locator.waitFor({ state: 'attached', timeout: 250 })
            .then(() => true)
            .catch(() => false);
    }
}