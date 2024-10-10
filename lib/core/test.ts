import { v4 } from "uuid";
import type {
	TestData,
	TestFunction,
	TestRunnerFunction,
	PreparedTestArgs
} from "../types/test.types";

/**
 * Utility class for preparing and running tests.
 */
export class Test {

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

/**
 * Represents a test case with associated data and setup.
 * @template T - The type of the test data.
 */
export class TestCase<T> {

    public readonly id: string;
    public readonly name: string;
    public readonly data: Partial<T>;
    private readonly setup?: (data: Partial<T>) => Promise<void>;

    public constructor(data: TestData<T>) {
        this.id = v4();
        this.name = data.name;
        this.data = data.data;
        this.setup = data.setup;
    }

    /**
     * Initializes the test case by running the setup function if provided.
     * @returns {Promise<void>} A promise that resolves when initialization is complete.
     */
    public async init(): Promise<void> {
        if (this.setup) await this.setup(this.data);
    }
}