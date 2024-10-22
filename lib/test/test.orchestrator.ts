import { Test } from "./test";
import TestCase from "./test.case";
import TestHook, { TestHookTypes } from "./test.hook";
import RuleEngine from "./rule.engine";
import type {
    TestFunction,
    TestRunnerFunction,
    TestConfig,
    TestCaseValidationError,
} from "./types";
import { Enum } from "../utils";

export const TestConfigDefault: TestConfig = {
	validateTypes: true,
	validateRules: true,
	ignoreValidation: false
};

export default class DataDrivenTest<T> {

	public constructor(
		public readonly cases: TestCase<T>[],
		public readonly ruleEngine: RuleEngine<T>,
		public readonly hooks: TestHook[],
		public readonly config: TestConfig = TestConfigDefault
	) {}

	public start(runner: TestRunnerFunction): void {
		try {
			Test.beforeAll(async () => await this.executeHooksByType(TestHookTypes.BeforeAll));
			Test.afterAll(async () => await this.executeHooksByType(TestHookTypes.AfterAll));
			Test.beforeEach(async () => await this.executeHooksByType(TestHookTypes.BeforeEach));
			Test.afterEach(async ({ testInfo }) => {
				(testInfo.testCase)
					? await testInfo.testCase.teardown()
					: console.warn(`Failed to perform teardown, test case not present in test info. Title: ${testInfo.title} ${testInfo.testId}`);
				await this.executeHooksByType(TestHookTypes.AfterEach);
			});

			for (const testCase of this.cases)
				Test(...this.initializeTestCase(testCase, runner));

		} catch (err) {
			const message = err instanceof Error ? err.message : JSON.stringify(err);
			console.error("Error occurred while starting test: ", message);
			throw err;
		}
	}

	private initializeTestCase(testCase: TestCase<T>, testRunner: TestRunnerFunction): [string, object, TestFunction] {
		const testFunction: TestFunction = async ({ page }, testInfo) => {
			try {
				console.log(`[${testCase.id}] Initializing test case: ${testCase.name}`);
				
				testInfo.testCase = testCase;
				await testInfo.testCase.setup();

				console.log(`[${testCase.id}] Validating test case: ${testCase.name}`);

				// Type Validation
				let typeErrors: TestCaseValidationError[] = [];
				if (this.config.validateTypes) {
					typeErrors = testCase.validateTypes();
					if (typeErrors.length > 0) {
						console.warn(`[${testCase.id}] Type Validation failed for test case: ${testCase.name}`);
						typeErrors.forEach((error) => console.error(error.message));
					}
				}

				// Rule Validation
				let ruleErrors: TestCaseValidationError[] = [];
				if (this.config.validateRules) {
					ruleErrors = this.ruleEngine.evaluate(testCase.id, testCase.data);
					if (ruleErrors.length > 0) {
						console.warn(`[${testCase.id}] Rule Validation failed for test case: ${testCase.name}`);
						ruleErrors.forEach((error) => console.error(error.message));
					}
				}

				if (!this.config.ignoreValidation) {
					testInfo.fixme(
						(typeErrors.length > 0 || ruleErrors.length > 0),
						`Validation failed for test case: ${testCase.name} (${testCase.id})`
					);
				}

			} catch (err) {
				if (err instanceof Error)
					console.error(`[${testCase.id}] Failed to initialize test case: ${testCase.name}`);
				throw err;
			}
			return testRunner(page, testInfo, testCase);
		};
		return [testCase.name, {}, testFunction];
	}

	private async executeHooksByType(hookType: TestHookTypes): Promise<void> {
		if (!Enum.isValid(hookType, TestHookTypes))
			throw new Error(`Tried to access test hooks with unknown type: ${hookType}`);
		for (const hook of this.hooks.filter((hook) => hook.type == hookType)) {
			console.log(`Executing Hook (${TestHookTypes[hook.type]}}): ${hook.name}`);
			await hook.callback();
			console.log(`Executed Hook (${TestHookTypes[hook.type]}): ${hook.name}`);
		}
	}
}