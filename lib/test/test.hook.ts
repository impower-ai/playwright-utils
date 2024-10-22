import { TestHookCallback } from "./types";

export enum TestHookTypes {
	BeforeEach,
	BeforeAll,
	AfterEach,
	AfterAll
}

export default class TestHook {

	public constructor(
		public readonly name: string,
		public readonly type: TestHookTypes,
		public readonly callback: TestHookCallback
	) {}
}