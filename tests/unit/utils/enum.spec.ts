import * as EnumUtils from "../../../lib/utils/enum";

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
        expect(EnumUtils.isFlagEnum(TestEnum)).toBe(true);
        expect(EnumUtils.isFlagEnum(NonFlagEnum)).toBe(false);
    });

    test('isValidEnumValue validates enum values correctly', () => {
        expect(EnumUtils.isValidEnumValue(1, TestEnum)).toBe(true);
        expect(EnumUtils.isValidEnumValue(3, TestEnum)).toBe(true);
        expect(EnumUtils.isValidEnumValue(8, TestEnum)).toBe(false);
        expect(EnumUtils.isValidEnumValue('A', NonFlagEnum)).toBe(true);
        expect(EnumUtils.isValidEnumValue('D', NonFlagEnum)).toBe(false);
    });

    test('getEnumValues returns correct values for both enum types', () => {
        expect(EnumUtils.getEnumValues(TestEnum)).toEqual([0, 1, 2, 4]);
        expect(EnumUtils.getEnumValues(NonFlagEnum)).toEqual(['A', 'B', 'C']);
    });

    test('getEnumString returns correct string representations', () => {
        expect(EnumUtils.getEnumString(TestEnum, 0)).toBe('None');
        expect(EnumUtils.getEnumString(TestEnum, 1)).toBe('One');
        expect(EnumUtils.getEnumString(TestEnum, 3)).toBe('One, Two');
        expect(EnumUtils.getEnumString(TestEnum, 7)).toBe('One, Two, Four');
    });

    test('validateEnumProperty correctly validates enum properties in JSON', () => {
        const validJson = { flag: 3 };
        const invalidJson = { flag: 8 };
        expect(EnumUtils.validateEnumProperty(validJson, 'flag', TestEnum)).toBe(3);
        expect(EnumUtils.validateEnumProperty(invalidJson, 'flag', TestEnum)).toBe(null);
    });

    test('hasFlag correctly checks for flag presence', () => {
        expect(EnumUtils.hasFlag(3, 1, TestEnum)).toBe(true);
        expect(EnumUtils.hasFlag(3, 4, TestEnum)).toBe(false);
        expect(EnumUtils.hasFlag('A', 'A', NonFlagEnum)).toBe(true);
        expect(EnumUtils.hasFlag('A', 'B', NonFlagEnum)).toBe(false);
    });

    test('addFlag adds flags correctly and throws error for non-flag enums', () => {
        expect(EnumUtils.addFlag(1, 2, TestEnum)).toBe(3);
        expect(() => EnumUtils.addFlag(1, 2, NonFlagEnum)).toThrow('Attempted to add flag on non-flags enum');
    });

    test('removeFlag removes flags correctly and throws error for non-flag enums', () => {
        expect(EnumUtils.removeFlag(3, 1, TestEnum)).toBe(2);
        expect(() => EnumUtils.removeFlag(1, 2, NonFlagEnum)).toThrow('Attempted to remove flag on non-flags enum');
    });

    test('toggleFlag toggles flags correctly and throws error for non-flag enums', () => {
        expect(EnumUtils.toggleFlag(1, 2, TestEnum)).toBe(3);
        expect(EnumUtils.toggleFlag(3, 2, TestEnum)).toBe(1);
        expect(() => EnumUtils.toggleFlag(1, 2, NonFlagEnum)).toThrow('Attempted to toggle flag on non-flags enum');
    });
});