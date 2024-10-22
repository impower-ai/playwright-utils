import { test as base } from "@playwright/test";
import { TestInfo } from "./types";

export const Test = base.extend<{ testInfo: TestInfo }>({
	testInfo: async ({}, use, testInfo) => {
		await use(testInfo as TestInfo);
	}
});
