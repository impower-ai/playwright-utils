
/**
 * Error thrown when a timeout occurs during a timing operation.
 */
export class TimeoutElapsedError extends Error {
    
    constructor(public readonly timeout: number) {
        super(`Timeout elapsed after ${timeout}ms.`);
        Object.setPrototypeOf(this, TimeoutElapsedError.prototype);
    }
}

/**
 * Error thrown when a condition fails during a timing operation.
 */
export class ConditionError extends Error {
    
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, ConditionError.prototype);
    }
}