
/**
 * Type for a condition function that returns a promise resolving to a boolean.
 */
export type ConditionFunc = () => Promise<boolean>;

export type TimingOptions = {
    timeout: number;
    timeoutShort: number;
    timeoutMedium: number;
    timeoutLong: number;
    pollInterval: number;
}
