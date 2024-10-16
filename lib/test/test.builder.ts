import { ZodObject, ZodRawShape } from "zod";
import TestCase, { TestCaseDefinition } from "./test.case";
import TestHook, { TestHookType, type TestHookCallback } from "./test.hook";
import TestRule, { type TestRuleCallback } from "./test.rule";
import Test from "./test";

export interface TestBuilder<D, T extends TestCase<D>> {
    testCases: T[];
    testHooks: TestHook[];
    testRules: TestRule<D>[];
    schema: ZodObject<ZodRawShape>;

    addCase(testCase: T): this;
    addCases(testCases: T[]): this;
    addBeforeAllHook(name: string, callback: TestHookCallback): this;
    addBeforeEachHook(name: string, callback: TestHookCallback): this;
    addAfterAllHook(name: string, callback: TestHookCallback): this;
    addAfterEachHook(name: string, callback: TestHookCallback): this;
    addRule(rule: { name: string, check: TestRuleCallback<D> }): this;
    addRules(rules: { name: string, check: TestRuleCallback<D> }[]): this;
    build(): Test<D>;
}

export class DataDrivenTestBuilder<D, T extends TestCase<D>> implements TestBuilder<D, T> {

	public testCases: T[] = [];
	public testHooks: TestHook[] = [];
	public testRules: TestRule<D>[] = [];

	public constructor(
		public readonly schema: ZodObject<ZodRawShape>
	) {}

	// Add Test Cases

	public addCase(testCase: T): this {
		this.testCases.push(testCase);
		return this;
	}

	public addCases(testCases: T[]): this {
		testCases.forEach((testCase) => this.addCase(testCase));
		return this;
	}

	// Add Hooks

	public addBeforeAllHook(name: string, callback: TestHookCallback): this {
		this.testHooks.push(new TestHook(name, TestHookType.BeforeAll, callback));
		return this;
	}

	public addBeforeEachHook(name: string, callback: TestHookCallback): this {
		this.testHooks.push(new TestHook(name, TestHookType.BeforeEach, callback));
		return this;
	}

	public addAfterAllHook(name: string, callback: TestHookCallback): this {
		this.testHooks.push(new TestHook(name, TestHookType.AfterAll, callback));
		return this;
	}

	public addAfterEachHook(name: string, callback: TestHookCallback): this {
		this.testHooks.push(new TestHook(name, TestHookType.AfterEach, callback));
		return this;
	}

	// Add Rules

	public addRule(rule: { name: string, check: TestRuleCallback<D> }): this {
		this.testRules.push(new TestRule<D>(rule.name, rule.check));
		return this;
	}

	public addRules(rules: { name: string, check: TestRuleCallback<D> }[]): this {
		rules.forEach((rule) => this.addRule(rule));
		return this;
	}

	// Build

	public build(): Test<D> {
		return new Test(this.schema, this.testCases, this.testRules, this.testHooks);
	}
}