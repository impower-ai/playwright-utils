
/**
 * Checks if the given enum object is a flag enum.
 * @param {object} enumObj - The enum object to check.
 * @returns {boolean} True if the enum is a flag enum, false otherwise.
 */
export function isFlag(enumObj: object): boolean {
    const values = Object.values(enumObj).filter(v => typeof v === "number");
    return values.some(v => v !== 0 && (v & (v - 1)) === 0);
}

/**
 * Validates if a given value is a valid enum value.
 * @param {any} value - The value to validate.
 * @param {object} enumType - The enum object to validate against.
 * @returns {boolean} True if the value is valid, false otherwise.
 */
export function isValid(value: any, enumType: object): boolean {
    if (isFlag(enumType)) {
        const allFlags = Object.values(enumType).reduce((acc, val) => typeof val === "number" ? acc | val : acc, 0);
        return typeof value === "number" && (value & allFlags) === value;
    } else {
        return Object.values(enumType).includes(value);
    }
}

/**
 * Retrieves the numeric value associated with a string key in an enum object.
 * @param {any} enumObj - The enum object to search in.
 * @param {string} stringValue - The string key to look up in the enum.
 * @returns {number | undefined} The numeric value associated with the string key, or undefined if the key doesn't exist in the enum.
 */
export function getValue(enumObj: any, stringValue: string): number | undefined {
    return enumObj[stringValue as keyof typeof enumObj];
}

/**
 * Gets all values from an enum object.
 * @param {object} enumObj - The enum object.
 * @returns {(string[]|number[])} An array of enum values.
 */
export function getValues(enumObj: object): string[] | number[] {
    if (!isFlag(enumObj))
        return Object.values(enumObj);
    return Object.values(enumObj).filter(value => typeof value === "number") as number[];
}

/**
 * Gets a string representation of enum flags.
 * @param {T} enumObj - The enum object.
 * @param {number} flags - The flags to convert to string.
 * @returns {string} A string representation of the flags.
 * @template T
 */
export function getFlagString<T extends { [key: string]: string | number }>(enumObj: T, flags: number): string {
    if (flags === 0) 
        return Object.keys(enumObj).find(key => enumObj[key] === 0) || 'None';

    const attributes = Object.entries(enumObj).filter(([key, value]) => 
            typeof value === 'number' && value !== 0 && (flags & value) === value)
            .map(([key]) => key);

    return attributes.length === 1 ? attributes[0] : attributes.join(', ');
}

/**
 * Validates an enum property in a JSON object.
 * @param {any} json - The JSON object.
 * @param {string} property - The property name to validate.
 * @param {object} enumType - The enum object to validate against.
 * @returns {(number|string|null)} The validated enum value, or null if invalid.
 * 
 * TODO: This method should return a boolean
 */
export function isValidProperty(json: any, property: string, enumType: object): number | string | null {
    if (json.hasOwnProperty(property) && isValid(json[property], enumType))
        return json[property];
    return null;
}

/**
 * Checks if a value has a specific flag.
 * @param {(number|string)} value - The value to check.
 * @param {(number|string)} flag - The flag to check for.
 * @param {object} enumType - The enum object.
 * @returns {boolean} True if the value has the flag, false otherwise.
 */
export function hasFlag(value: number | string, flag: number | string, enumType: object): boolean {
    if (isFlag(enumType))
        return typeof value === "number" && typeof flag === "number" && (value & flag) === flag;
    else
        return value === flag;
}

/**
 * Adds a flag to a value for a flag enum.
 * @param {number} value - The original value.
 * @param {number} flag - The flag to add.
 * @param {object} enumType - The enum object.
 * @returns {number} The new value with the added flag.
 * @throws {Error} If the enum is not a flag enum.
 */
export function addFlag(value: number, flag: number, enumType: object): number {
    if (isFlag(enumType))
        return value | flag;
    else
        throw new Error("Attempted to add flag on non-flags enum");
}

/**
 * Removes a flag from a value for a flag enum.
 * @param {number} value - The original value.
 * @param {number} flag - The flag to remove.
 * @param {object} enumType - The enum object.
 * @returns {number} The new value with the removed flag.
 * @throws {Error} If the enum is not a flag enum.
 */
export function removeFlag(value: number, flag: number, enumType: object): number {
    if (isFlag(enumType))
        return value & ~flag;
    else
        throw new Error("Attempted to remove flag on non-flags enum");
}

/**
 * Toggles a flag in a value for a flag enum.
 * @param {number} value - The original value.
 * @param {number} flag - The flag to toggle.
 * @param {object} enumType - The enum object.
 * @returns {number} The new value with the toggled flag.
 * @throws {Error} If the enum is not a flag enum.
 */
export function toggleFlag(value: number, flag: number, enumType: object): number {
    if (isFlag(enumType))
        return value ^ flag;
    else
        throw new Error("Attempted to toggle flag on non-flags enum");
}