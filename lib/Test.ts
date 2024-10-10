import type {
	TestData,
	TestFunction,
	TestRunnerFunction,
	PreparedTestArgs
} from "./types/types.test";
import TestCase from "./TestCase";

/**
 * Utility class for preparing and running tests.
 */
export default class Test {

    /**
     * Prepares a test for execution.
     * @param {TestData<any>} testData - The test data.
     * @param {TestRunnerFunction} testRunner - The function to run the test.
     * @returns {PreparedTestArgs} An array containing the test name, options, and the test function.
     */
	public static prepare(testData: TestData<any>, testRunner: TestRunnerFunction): PreparedTestArgs {
		const testFunction: TestFunction = async ({ page }, testInfo) => {
			const testCase = new TestCase(testData);
			await testCase.init();
			return testRunner(page, testInfo, testCase);
		};
		return [testData.name, {}, testFunction];
	}
}
