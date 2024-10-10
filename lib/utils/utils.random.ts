
/**
 * Generates a random integer between the specified minimum and maximum values (inclusive).
 *
 * @param {number} min - The lower bound of the range (inclusive).
 * @param {number} max - The upper bound of the range (inclusive).
 * @returns {number} A random integer between min and max (inclusive).
 */
export function getRandomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}