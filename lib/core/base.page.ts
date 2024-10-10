import { Page } from "@playwright/test";
import { PageObject } from "../types";
import { BaseObject } from "./base.object";

/**
 * Represents a base page object that implements the PageObject interface.
 * @abstract
 * @class
 */
export abstract class BasePage extends BaseObject implements PageObject {

    /**
     * Creates an instance of BasePage.
     * @param {Page} page - The Page object representing the web page.
     */
    public constructor(page: Page) {
        super(page);
    }

    /**
     * Checks if the page is currently loaded.
     * @abstract
     * @returns {Promise<boolean>} A promise that resolves when the check is complete.
     */
    abstract isLoaded(): Promise<boolean>;

    /**
     * Waits until the page is fully loaded.
     * @abstract
     * @returns {Promise<void>} A promise that resolves when the page is loaded.
     */
    abstract waitUntilLoaded(): Promise<void>;
}
