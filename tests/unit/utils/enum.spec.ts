import { Utils } from "../../../lib";

describe('Enum Utility Functions', () => {

    enum TestEnum {
        None = 0,
        One = 1,
        Two = 2,
        Four = 4
    }
    
    enum NonFlagEnum {
        A = 'A',
        B = 'B',
        C = 'C'
    }

    test('isFlagEnum identifies flag and non-flag enums correctly', () => {
        expect(Utils.Enum.isFlagEnum(TestEnum)).toBe(true);
        expect(Utils.Enum.isFlagEnum(NonFlagEnum)).toBe(false);
    });

    test('isValidEnumValue validates enum values correctly', () => {
        expect(Utils.Enum.isValidEnumValue(1, TestEnum)).toBe(true);
        expect(Utils.Enum.isValidEnumValue(3, TestEnum)).toBe(true);
        expect(Utils.Enum.isValidEnumValue(8, TestEnum)).toBe(false);
        expect(Utils.Enum.isValidEnumValue('A', NonFlagEnum)).toBe(true);
        expect(Utils.Enum.isValidEnumValue('D', NonFlagEnum)).toBe(false);
    });

    test('getEnumValues returns correct values for both enum types', () => {
        expect(Utils.Enum.getEnumValues(TestEnum)).toEqual([0, 1, 2, 4]);
        expect(Utils.Enum.getEnumValues(NonFlagEnum)).toEqual(['A', 'B', 'C']);
    });

    test('getEnumString returns correct string representations', () => {
        expect(Utils.Enum.getEnumString(TestEnum, 0)).toBe('None');
        expect(Utils.Enum.getEnumString(TestEnum, 1)).toBe('One');
        expect(Utils.Enum.getEnumString(TestEnum, 3)).toBe('One, Two');
        expect(Utils.Enum.getEnumString(TestEnum, 7)).toBe('One, Two, Four');
    });

    test('validateEnumProperty correctly validates enum properties in JSON', () => {
        const validJson = { flag: 3 };
        const invalidJson = { flag: 8 };
        expect(Utils.Enum.validateEnumProperty(validJson, 'flag', TestEnum)).toBe(3);
        expect(Utils.Enum.validateEnumProperty(invalidJson, 'flag', TestEnum)).toBe(null);
    });

    test('hasFlag correctly checks for flag presence', () => {
        expect(Utils.Enum.hasFlag(3, 1, TestEnum)).toBe(true);
        expect(Utils.Enum.hasFlag(3, 4, TestEnum)).toBe(false);
        expect(Utils.Enum.hasFlag('A', 'A', NonFlagEnum)).toBe(true);
        expect(Utils.Enum.hasFlag('A', 'B', NonFlagEnum)).toBe(false);
    });

    test('addFlag adds flags correctly and throws error for non-flag enums', () => {
        expect(Utils.Enum.addFlag(1, 2, TestEnum)).toBe(3);
        expect(() => Utils.Enum.addFlag(1, 2, NonFlagEnum)).toThrow('Attempted to add flag on non-flags enum');
    });

    test('removeFlag removes flags correctly and throws error for non-flag enums', () => {
        expect(Utils.Enum.removeFlag(3, 1, TestEnum)).toBe(2);
        expect(() => Utils.Enum.removeFlag(1, 2, NonFlagEnum)).toThrow('Attempted to remove flag on non-flags enum');
    });

    test('toggleFlag toggles flags correctly and throws error for non-flag enums', () => {
        expect(Utils.Enum.toggleFlag(1, 2, TestEnum)).toBe(3);
        expect(Utils.Enum.toggleFlag(3, 2, TestEnum)).toBe(1);
        expect(() => Utils.Enum.toggleFlag(1, 2, NonFlagEnum)).toThrow('Attempted to toggle flag on non-flags enum');
    });
});