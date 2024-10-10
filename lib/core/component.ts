import { Page } from "@playwright/test";
import { Timing } from "../utils";
import { HydratableComponent } from "../types";
import { BasePageObject } from "./page";

/**
 * Represents a base component for page objects.
 * @abstract
 * @class
 * @extends {BasePageObject}
 */
export abstract class BaseComponent extends BasePageObject {}

/**
 * Represents a base hydratable component.
 * @abstract
 * @class
 * @extends {BaseComponent}
 * @implements {HydratableComponent<T>}
 * @template T
 */
export abstract class BaseHydratableComponent<T> extends BaseComponent implements HydratableComponent<T>  {
    
    /**
     * The data associated with the component.
     * @public
     * @readonly
     * @type {Partial<T>}
     */
    public readonly data: Partial<T> = {};

    /**
     * Creates an instance of BaseHydratableComponent.
     * @param {Page} page - The page object associated with this component.
     */
    public constructor(page: Page) {
        super(page);
    }
    
    /**
     * Checks if the component is hydrated.
     * @abstract
     * @returns {Promise<boolean>} A promise that resolves to true if the component is hydrated, false otherwise.
     */
    public abstract isHydrated(): Promise<boolean>;

    /**
     * Waits for the component to be hydrated.
     * @param {number} [timeout=30000] - The maximum time to wait for hydration in milliseconds.
     * @returns {Promise<void>} A promise that resolves when the component is hydrated.
     */
    public async waitForHydration(timeout: number = 30000): Promise<void> {
        await Timing.waitFor(async () => this.isHydrated());
    }

    /**
     * Hydrates the component.
     * @abstract
     * @returns {Promise<void>} A promise that resolves when the component is hydrated.
     */
    public abstract hydrate(): Promise<void>;
}