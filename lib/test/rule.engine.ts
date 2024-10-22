import Rule from "./rule";
import { TestCaseValidationErrorTypes } from "./test.case";
import { TestCaseValidationError } from "./types";

export default class RuleEngine<T> {

    public readonly _rules: Rule<T>[];

    public constructor(rules: Rule<T>[]) {
        this._rules = this.sortRules(rules);
    }

    private sortRules(rules: Rule<T>[]) {
        const rulesMap = new Map(rules.map(rule => [rule.id, rule]));
		const sortedRules: Rule<T>[] = [];
		const visited = new Set<number>();

		const visit = (rule: Rule<T>, stack = new Set<number>()): void => {
			if (stack.has(rule.id))
				throw new Error(`Circular dependency detected in rule: ${rule.name}!`);

			if (visited.has(rule.id)) return;

			if (rule.dependsOn?.length) {
				stack.add(rule.id);
				
				for (const depId of rule.dependsOn) {
					const dependencyRule = rulesMap.get(depId);
					
					if (!dependencyRule)
                        throw new Error(`Rule "${rule.name}" depends on non-existent rule ID: ${depId}`);

					if (!visited.has(depId))
                        visit(dependencyRule, stack);
				}

				stack.delete(rule.id);
			}
			visited.add(rule.id);
			sortedRules.push(rule);
		};

		for (const rule of rules)
			if (!visited.has(rule.id))
				visit(rule);

		return sortedRules;
	}

    public evaluate(id: string, data: Partial<T>): TestCaseValidationError[] {
        const errors: TestCaseValidationError[] = [];
        this._rules.forEach((rule) => {
            try {
                const result = rule.check(data);
                if (!result) errors.push({
                    type: TestCaseValidationErrorTypes.RuleError,
                    message: `[${id}] Rule Failed: ${rule.name} (${rule.id})`
                });
            } catch (err) {
                const message = (err instanceof Error) ? err.message : err;
                console.error(err);
                errors.push({
                    type: TestCaseValidationErrorTypes.RuleError,
                    message: `Error occurred when evaluating rule #${rule.id} for test case ${id}: ${message}`
                });
            }
        });
        return errors;
    }
}