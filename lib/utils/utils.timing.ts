import { ConditionError, TimeoutElapsedError } from "../Error";
import { ConditionFunc, TimingOptions } from "../types/types.timing";
import { Page, Locator, expect } from "@playwright/test";

/**
 * Default timing options used across the utility functions.
 */
export const DefaultTimingOptions: TimingOptions = {
    timeout: +(process.env.PW_TIMEOUT ?? 30_000),
    timeoutShort: +(process.env.PW_TIMEOUT_SHORT ?? 10_000),
    timeoutMedium: +(process.env.PW_TIMEOUT_MEDIUM ?? 60_000),
    timeoutLong: +(process.env.PW_TIMEOUT_LONG ?? 120_000),
    pollInterval: +(process.env.PW_POLL_INTERVAL ?? 1_000)
};

/**
 * Creates a Promise that rejects after a specified timeout.
 * @param {number} timeout - The timeout duration in milliseconds.
 * @returns {Promise<never>} A Promise that rejects with a TimeoutElapsedError after the specified timeout.
 */
export const createTimeoutPromise = (timeout: number): Promise<never> =>
    new Promise((_, reject) => setTimeout(() => reject(new TimeoutElapsedError(timeout)), timeout));

/**
 * Wraps a condition function to safely execute it and return a boolean result.
 * @param {ConditionFunc} condition - The condition function to execute.
 * @returns {Promise<boolean>} A Promise that resolves to true if the condition is met, false otherwise.
 */
export const createSafeCondition = async (condition: ConditionFunc): Promise<boolean> => {
    try {
        return await condition();
    } catch (err) {
        return false;
    }
};

/**
 * Creates a delay for a specified duration.
 * @param {number} timeout - The delay duration in milliseconds.
 * @returns {Promise<void>} A Promise that resolves after the specified delay.
 */
export const delay = (timeout: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, timeout));

/**
 * Waits for a condition to be true within a specified timeout.
 * @param {ConditionFunc} condition - The condition to wait for.
 * @param {Partial<Pick<TimingOptions, 'timeout' | 'pollInterval'>>} [options] - Optional timing parameters.
 * @throws {TimeoutElapsedError} If the condition is not met within the timeout.
 * @throws {ConditionError} If an error occurs while checking the condition.
 */
export const waitFor = async (condition: ConditionFunc, options: Partial<Pick<TimingOptions, 'timeout' | 'pollInterval'>> = {}): Promise<void> => {
    const { timeout = DefaultTimingOptions.timeout, pollInterval = DefaultTimingOptions.pollInterval } = options;
    try {
        await Promise.race([
            (async () => {
                while (!(await condition())) {
                    await delay(pollInterval);
                }
            })(),
            createTimeoutPromise(timeout)
        ]);
    } catch (err) {
        if (err instanceof TimeoutElapsedError)
            throw err;
        throw new ConditionError(`Error while waiting for condition: ${err instanceof Error ? err.message : String(err)}`);
    }
};

/**
 * Waits for a value to stabilize (remain unchanged) within a specified timeout.
 * @template T The type of the value being checked.
 * @param {() => Promise<T>} valueFunc - A function that returns the value to check for stability.
 * @param {Partial<TimingOptions>} [options] - Optional timing parameters.
 * @returns {Promise<T>} A Promise that resolves to the stable value.
 * @throws {ConditionError} If the value does not stabilize within the timeout.
 */
export const waitForStableValue = async <T>(valueFunc: () => Promise<T>, options: Partial<TimingOptions> = {}): Promise<T> => {
    const { timeout = DefaultTimingOptions.timeout, pollInterval = DefaultTimingOptions.pollInterval } = options;
    try {
        let lastValue: T | undefined;
        await waitFor(
            async (): Promise<boolean> => {
                const newValue = await valueFunc();
                const stable = newValue !== undefined && newValue === lastValue;
                lastValue = newValue;
                return stable;
            },
            { timeout, pollInterval }
        );
        return lastValue as T;
    } catch (err) {
        if (err instanceof TimeoutElapsedError)
            throw err;
        throw new ConditionError(`Value did not stabilize within ${timeout}ms.`);
    }
};

/**
 * Waits for all specified conditions to be true within a timeout.
 * @param {ConditionFunc[]} conditions - An array of condition functions to wait for.
 * @param {Partial<TimingOptions>} [options] - Optional timing parameters.
 * @throws {TimeoutElapsedError} If not all conditions are met within the timeout.
 * @throws {ConditionError} If an error occurs while checking the conditions.
 */
export const waitForAll = async (conditions: ConditionFunc[], options: Partial<TimingOptions> = {}): Promise<void> => {
    const { timeout = DefaultTimingOptions.timeout } = options;
    try {
        await Promise.race([
            Promise.all(conditions.map(c => c())),
            createTimeoutPromise(timeout)
        ]);
    } catch (err) {
        if (err instanceof TimeoutElapsedError)
            throw err;
        throw new ConditionError("One or more conditions failed");
    }
};

/**
 * Waits for any of the specified conditions to be true within a timeout.
 * @param {ConditionFunc[]} conditions - An array of condition functions to wait for.
 * @param {Partial<TimingOptions>} [options] - Optional timing parameters.
 * @throws {TimeoutElapsedError} If none of the conditions are met within the timeout.
 * @throws {ConditionError} If all conditions fail or an error occurs.
 */
export const waitForAny = async (conditions: ConditionFunc[], options: Partial<TimingOptions> = {}): Promise<void> => {
    const { timeout = DefaultTimingOptions.timeout } = options;
    try {
        await Promise.race([
            Promise.any(conditions.map(createSafeCondition)),
            createTimeoutPromise(timeout)
        ]);
    } catch (err) {
        if (err instanceof TimeoutElapsedError)
            throw err;
        throw new ConditionError("None of the conditions resolved.");
    }
};

/**
 * Waits for a URL to match a specified pattern within a timeout.
 * @param {Page} page - The Playwright Page object to check the URL against.
 * @param {RegExp} urlPattern - The regular expression pattern to match the URL against.
 * @param {Partial<Pick<TimingOptions, 'timeout' | 'pollInterval'>>} [options] - Optional timing parameters.
 * @throws {ConditionError} If the URL does not match the pattern within the timeout.
 */
export const waitForUrlMatch = async (page: Page, urlPattern: RegExp, options: Partial<Pick<TimingOptions, 'timeout' | 'pollInterval'>> = {}): Promise<void> => {
    const { timeout = DefaultTimingOptions.timeout, pollInterval = DefaultTimingOptions.pollInterval } = options;
    try {
        await waitFor(async () => urlPattern.test(page.url()), { timeout, pollInterval });
    } catch (err) {
        if (err instanceof TimeoutElapsedError)
            throw err;
        throw new ConditionError(`URL did not match pattern ${urlPattern} within ${timeout}ms.`);
    }
};

/**
 * Waits for either of two conditions to be true within a timeout.
 * @param {ConditionFunc} condition1 - The first condition function to wait for.
 * @param {ConditionFunc} condition2 - The second condition function to wait for.
 * @param {Partial<TimingOptions>} [options] - Optional timing parameters.
 * @throws {ConditionError} If neither condition is met within the timeout.
 */
export const waitForEither = async (condition1: ConditionFunc, condition2: ConditionFunc, options: Partial<TimingOptions> = {}): Promise<void> => {
    const { timeout = DefaultTimingOptions.timeout, pollInterval = DefaultTimingOptions.pollInterval } = options;
    try {
        await waitFor(async () => await condition1() || await condition2(), { timeout, pollInterval });
    } catch (err) {
        if (err instanceof TimeoutElapsedError)
            throw err;
        throw new ConditionError("Neither condition was met within the specified timeout.");
    }
};

/**
 * Waits for an element to appear and then disappear within a timeout.
 * @param {Locator} locator - The Playwright Locator for the element to wait for.
 * @throws {ConditionError} If the element does not appear and disappear as expected.
 */
export const waitToAppearAndDisappear = async (locator: Locator): Promise<void> => {
    try {
        await expect(locator).toBeVisible({ timeout: 60000 });
        await expect(locator).toBeHidden({ timeout: 60000 });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : JSON.stringify(err);
        throw new ConditionError(`Element did not appear and disappear as expected: ${errorMessage}`);
    }
};