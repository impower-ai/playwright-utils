
export enum TestHookType {
	BeforeEach,
	BeforeAll,
	AfterEach,
	AfterAll
}

export type TestHookCallback = () => Promise<void> | void;

export default class TestHook {

	public constructor(
		public readonly name: string,
		public readonly type: TestHookType,
		public readonly callback: TestHookCallback
	) {}
}