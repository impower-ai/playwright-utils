import { Page } from "@playwright/test";
import { PageObject } from "../types";

/**
 * Represents a base page object that implements the PageObject interface.
 * @abstract
 * @class
 */
export abstract class BasePageObject implements PageObject {

    /**
     * Creates an instance of BasePageObject.
     * @param {Page} page - The Page object representing the web page.
     */
    public constructor(
        protected readonly page: Page
    ) {}

    /**
     * Waits until the page is fully loaded.
     * @abstract
     * @returns {Promise<void>} A promise that resolves when the page is loaded.
     */
    abstract waitUntilLoaded(): Promise<void>;
    
    /**
     * Checks if the page is currently loaded.
     * @abstract
     * @returns {Promise<void>} A promise that resolves when the check is complete.
     */
    abstract isLoaded(): Promise<void>;
}
