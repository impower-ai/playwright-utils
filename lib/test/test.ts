import TestCase from "./test.case";
import TestRule from "./test.rule";
import TestHook, { TestHookType } from "./test.hook";
import { Utils } from "..";
import {
	test,
    TestInfo,
    PlaywrightTestArgs,
    PlaywrightTestOptions,
    PlaywrightWorkerArgs,
    PlaywrightWorkerOptions,
    Page
} from "@playwright/test";
import { ZodObject, ZodRawShape } from "zod";

export type TestFunctionArgs = PlaywrightTestArgs & PlaywrightTestOptions & PlaywrightWorkerArgs & PlaywrightWorkerOptions;

export type TestFunction = (args: TestFunctionArgs, testInfo: TestInfo) => void | Promise<void>;

export type TestRunnerFunction = (page: Page, testInfo: TestInfo, testCase: TestCase<any>) => Promise<void>;

export type PreparedTestArgs = [string, object, TestFunction];

export default class Test<T> {

	public constructor(
		public readonly schema: ZodObject<ZodRawShape>,
		public readonly cases: TestCase<T>[],
		public readonly rules: TestRule<T>[],
		public readonly hooks: TestHook[]
	) {
		const validationErrors = [];
		cases.forEach((testCase) => {
			const result = this.schema.safeParse(testCase.data);

		});
	}

	public start(runner: TestRunnerFunction): void {
		try {
			test.beforeAll(async () => await this.executeHooksByType(TestHookType.BeforeAll));
			test.beforeEach(async () => await this.executeHooksByType(TestHookType.BeforeEach));
			test.afterAll(async () => await this.executeHooksByType(TestHookType.AfterAll));
			test.afterEach(async () => await this.executeHooksByType(TestHookType.AfterEach));
			
			for (const testCase of this.cases) {
				test(testCase.name, {}, async ({ page }, testInfo) => {
					await test.step("TestCase Setup", async () => {
						await testCase.setup(testCase.data);
					});
					await runner(page, testInfo, testCase);
					await test.step("TestCase Setup", async () => {
						await testCase.teardown(testCase.data);
					});
				});
			}

		} catch (err) {
			const message = err instanceof Error ? err.message : JSON.stringify(err);
			console.error("Error occurred while starting test: ", message);
			throw err;
		}
	}

	private async executeHooksByType(hookType: TestHookType): Promise<void> {
		if (!Utils.Enum.isValid(hookType, TestHookType))
			throw new Error(`Tried to access test hooks with unknown type: ${hookType}`);
		for (const hook of this.hooks.filter((hook) => hook.type == hookType)) {
			console.log(`Executing Hook (${TestHookType[hook.type]}}): ${hook.name}`);
			await hook.callback();
			console.log(`Executed Hook (${TestHookType[hook.type]}): ${hook.name}`);
		}
	}
}
