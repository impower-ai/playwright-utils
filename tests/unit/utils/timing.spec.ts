// import {
//     TimeoutElapsedError,
//     ConditionError,
// } from "../../../lib";
// import { Utils } from "../../../lib";

// describe('Timing Utilities', () => {

//     test('createTimeoutPromise', async () => {
//         const promise = Utils.Timing.createTimeoutPromise(100);
//         await expect(promise).rejects.toThrow(TimeoutElapsedError);
//         await expect(promise).rejects.toThrow('Timeout elapsed after 100ms.');
//     });

//     test('createSafeCondition with successful condition', async () => {
//         const condition = async () => true;
//         const result = await Utils.Timing.createSafeCondition(condition);
//         expect(result).toBe(true);
//     });

//     test('createSafeCondition with failing condition', async () => {
//         const condition = async () => { throw new Error('Test error'); };
//         const result = await Utils.Timing.createSafeCondition(condition);
//         expect(result).toBe(false);
//     });

//     test('delay', async () => {
//         const start = Date.now();
//         await Utils.Timing.delay(100);
//         const end = Date.now();
//         expect(end - start).toBeGreaterThanOrEqual(100);
//     });

//     test('waitFor with successful condition', async () => {
//         let counter = 0;
//         const condition = async () => {
//             counter++;
//             return counter >= 3;
//         };
//         await expect(Utils.Timing.waitFor(condition, { pollInterval: 10 })).resolves.not.toThrow();
//         expect(counter).toBe(3);
//     });

//     test('waitFor with timeout', async () => {
//         const condition = async () => false;
//         await expect(Utils.Timing.waitFor(condition, { timeout: 100, pollInterval: 10 }))
//             .rejects.toThrow(TimeoutElapsedError);
//     });

//     test('waitForStableValue with quickly stabilizing value', async () => {
//         let value = 0;
//         const valueFunc = async () => {
//             if (value < 3) value++;
//             return value;
//         };
//         const result = await Utils.Timing.waitForStableValue(valueFunc, { pollInterval: 10 });
//         expect(result).toBe(3);
//     });

//     test('waitForStableValue with timeout', async () => {
//         let value = 0;
//         const valueFunc = async () => value++;
//         await expect(Utils.Timing.waitForStableValue(valueFunc, { timeout: 100, pollInterval: 10 }))
//             .rejects.toThrow(ConditionError);
//     });

//     test('waitForAll with all conditions succeeding', async () => {
//         const conditions = [
//             async () => true,
//             async () => true,
//             async () => true
//         ];
//         await expect(Utils.Timing.waitForAll(conditions)).resolves.not.toThrow();
//     });

//     test('waitForAll with one condition failing', async () => {
//         const conditions = [
//             async () => true,
//             async () => false,
//             async () => true
//         ];
//         await expect(Utils.Timing.waitForAll(conditions)).rejects.toThrow(ConditionError);
//     });

//     test('waitForAny with one condition succeeding', async () => {
//         const conditions = [
//             async () => false,
//             async () => true,
//             async () => false
//         ];
//         await expect(Utils.Timing.waitForAny(conditions)).resolves.not.toThrow();
//     });

//     test('waitForAny with all conditions failing', async () => {
//         const conditions = [
//             async () => false,
//             async () => false,
//             async () => false
//         ];
//         await expect(Utils.Timing.waitForAny(conditions)).rejects.toThrow(ConditionError);
//     });

//     test('waitForEither with first condition succeeding', async () => {
//         const condition1 = async () => true;
//         const condition2 = async () => false;
//         await expect(Utils.Timing.waitForEither(condition1, condition2)).resolves.not.toThrow();
//     });

//     test('waitForEither with second condition succeeding', async () => {
//         const condition1 = async () => false;
//         const condition2 = async () => true;
//         await expect(Utils.Timing.waitForEither(condition1, condition2)).resolves.not.toThrow();
//     });

//     test('waitForEither with both conditions failing', async () => {
//         const condition1 = async () => false;
//         const condition2 = async () => false;
//         await expect(Utils.Timing.waitForEither(condition1, condition2, { timeout: 100, pollInterval: 10 }))
//             .rejects.toThrow(ConditionError);
//     });
// });