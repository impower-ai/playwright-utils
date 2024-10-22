import TestCase from "./test.case";
import RuleEngine from "./rule.engine";
import type {
	TestCaseCallback,
	TestCaseDefinition,
	TestConfig,
	TestHookCallback,
	RuleDefinition
} from "./types";
import TestOrchestrator, { TestConfigDefault } from "./test.orchestrator";
import TestHook, { TestHookTypes } from "./test.hook";
import Rule from "./rule";

export default class TestBuilder<T> {

	private _cases: TestCaseDefinition<T>[] = [];
	private _hooks: TestHook[] = [];
	private _rules: RuleDefinition<T>[] = [];
	private _setupCallback?: TestCaseCallback<T>;
    private _teardownCallback?: TestCaseCallback<T>;

	public constructor(
		private readonly config: TestConfig = TestConfigDefault
	) {}

	public static new<T>(config: TestConfig = TestConfigDefault): TestBuilder<T> {
		return new this<T>(config);
	}

	// Add Test Cases

	public addCase(testCase: TestCaseDefinition<T>): this;
	public addCase(testCases: TestCaseDefinition<T>[]): this;
	public addCase(caseOrCases: TestCaseDefinition<T> | TestCaseDefinition<T>[]): this {
		(Array.isArray(caseOrCases))
			? caseOrCases.forEach((testCase) => this._cases.push(testCase))
			: this._cases.push(caseOrCases);
		return this;
	}

	// Add Test Case Hooks

	public setup(callback: TestCaseCallback<T>): this {
		this._setupCallback = callback;
		return this;
	}

	public teardown(callback: TestCaseCallback<T>): this {
		this._teardownCallback = callback;
		return this;
	}

	// Add Hooks

	public addBeforeAllHook(name: string, callback: TestHookCallback): this {
		this._hooks.push(new TestHook(name, TestHookTypes.BeforeAll, callback));
		return this;
	}

	public addBeforeEachHook(name: string, callback: TestHookCallback): this {
		this._hooks.push(new TestHook(name, TestHookTypes.BeforeEach, callback));
		return this;
	}

	public addAfterAllHook(name: string, callback: TestHookCallback): this {
		this._hooks.push(new TestHook(name, TestHookTypes.AfterAll, callback));
		return this;
	}

	public addAfterEachHook(name: string, callback: TestHookCallback): this {
		this._hooks.push(new TestHook(name, TestHookTypes.AfterEach, callback));
		return this;
	}

	public addRule(rule: RuleDefinition<T>): this;
	public addRule(rules: RuleDefinition<T>[]): this;
	public addRule(ruleOrRules: RuleDefinition<T> | RuleDefinition<T>[]): this {
		(Array.isArray(ruleOrRules))
			? ruleOrRules.forEach((rule) => this._rules.push(rule))
			: this._rules.push(ruleOrRules);
		return this;
	}

	public build(): TestOrchestrator<T> {
		
		// Build Test Rules
		const testRules: Rule<T>[] = this._rules.map((definition) => new Rule<T>(definition));
		const ruleEngine = new RuleEngine<T>(testRules);

		// Build Test Cases
		const testCases: TestCase<T>[] = this._cases.map((definition) => {
			if (this._setupCallback && definition.setup == undefined)
				definition.setup = this._setupCallback;
			if (this._teardownCallback && definition.teardown == undefined)
				definition.teardown = this._teardownCallback;
			return new TestCase<T>(definition);
		});
		return new TestOrchestrator(testCases, ruleEngine, this._hooks, this.config);
	}
}