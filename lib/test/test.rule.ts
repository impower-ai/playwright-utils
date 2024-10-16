
export type TestRuleCallback<T> = (data: Partial<T>) => Promise<boolean> | boolean;

export default class TestRule<T> {

    public constructor(
        public readonly name: string,
        public readonly check: TestRuleCallback<T>
    ) {}
}
