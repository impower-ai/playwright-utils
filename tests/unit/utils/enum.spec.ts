// import { Utils } from "../../../lib";

// describe('Enum Utility Functions', () => {

//     enum TestEnum {
//         None = 0,
//         One = 1,
//         Two = 2,
//         Four = 4
//     }
    
//     enum NonFlagEnum {
//         A = 'A',
//         B = 'B',
//         C = 'C'
//     }

//     test('isFlag identifies flag and non-flag enums correctly', () => {
//         expect(Utils.Enum.isFlag(TestEnum)).toBe(true);
//         expect(Utils.Enum.isFlag(NonFlagEnum)).toBe(false);
//     });

//     test('isValid validates enum values correctly', () => {
//         expect(Utils.Enum.isValid(1, TestEnum)).toBe(true);
//         expect(Utils.Enum.isValid(3, TestEnum)).toBe(true);
//         expect(Utils.Enum.isValid(8, TestEnum)).toBe(false);
//         expect(Utils.Enum.isValid('A', NonFlagEnum)).toBe(true);
//         expect(Utils.Enum.isValid('D', NonFlagEnum)).toBe(false);
//     });

//     test('getValues returns correct values for both enum types', () => {
//         expect(Utils.Enum.getValues(TestEnum)).toEqual([0, 1, 2, 4]);
//         expect(Utils.Enum.getValues(NonFlagEnum)).toEqual(['A', 'B', 'C']);
//     });

//     test('getFlagString returns correct string representations', () => {
//         expect(Utils.Enum.getFlagString(TestEnum, 0)).toBe('None');
//         expect(Utils.Enum.getFlagString(TestEnum, 1)).toBe('One');
//         expect(Utils.Enum.getFlagString(TestEnum, 3)).toBe('One, Two');
//         expect(Utils.Enum.getFlagString(TestEnum, 7)).toBe('One, Two, Four');
//     });

//     test('isValidProperty correctly validates enum properties in JSON', () => {
//         const validJson = { flag: 3 };
//         const invalidJson = { flag: 8 };
//         expect(Utils.Enum.isValidProperty(validJson, 'flag', TestEnum)).toBe(3);
//         expect(Utils.Enum.isValidProperty(invalidJson, 'flag', TestEnum)).toBe(null);
//     });

//     test('hasFlag correctly checks for flag presence', () => {
//         expect(Utils.Enum.hasFlag(3, 1, TestEnum)).toBe(true);
//         expect(Utils.Enum.hasFlag(3, 4, TestEnum)).toBe(false);
//         expect(Utils.Enum.hasFlag('A', 'A', NonFlagEnum)).toBe(true);
//         expect(Utils.Enum.hasFlag('A', 'B', NonFlagEnum)).toBe(false);
//     });

//     test('addFlag adds flags correctly and throws error for non-flag enums', () => {
//         expect(Utils.Enum.addFlag(1, 2, TestEnum)).toBe(3);
//         expect(() => Utils.Enum.addFlag(1, 2, NonFlagEnum)).toThrow('Attempted to add flag on non-flags enum');
//     });

//     test('removeFlag removes flags correctly and throws error for non-flag enums', () => {
//         expect(Utils.Enum.removeFlag(3, 1, TestEnum)).toBe(2);
//         expect(() => Utils.Enum.removeFlag(1, 2, NonFlagEnum)).toThrow('Attempted to remove flag on non-flags enum');
//     });

//     test('toggleFlag toggles flags correctly and throws error for non-flag enums', () => {
//         expect(Utils.Enum.toggleFlag(1, 2, TestEnum)).toBe(3);
//         expect(Utils.Enum.toggleFlag(3, 2, TestEnum)).toBe(1);
//         expect(() => Utils.Enum.toggleFlag(1, 2, NonFlagEnum)).toThrow('Attempted to toggle flag on non-flags enum');
//     });
// });