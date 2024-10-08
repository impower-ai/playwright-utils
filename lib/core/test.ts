import { v4 } from "uuid";
import type {
	TestData,
	TestFunction,
	TestRunnerFunction,
	PreparedTestArgs
} from "./test.types";

export class Test {

	public static prepare(testData: TestData<any>, testRunner: TestRunnerFunction): PreparedTestArgs {
		const testFunction: TestFunction = async ({ page }, testInfo) => {
			const testCase = new TestCase(testData);
			await testCase.init();
			return testRunner(page, testInfo, testCase);
		};
		return [testData.name, {}, testFunction];
	}
}

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

    public async init(): Promise<void> {
        if (this.setup) await this.setup(this.data);
    }
}