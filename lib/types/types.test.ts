import {
    TestInfo,
    PlaywrightTestArgs,
    PlaywrightTestOptions,
    PlaywrightWorkerArgs,
    PlaywrightWorkerOptions,
    Page
} from "@playwright/test";
import { TestCase } from "../Test";

export type TestFunctionArgs = PlaywrightTestArgs & PlaywrightTestOptions & PlaywrightWorkerArgs & PlaywrightWorkerOptions;

export type TestFunction = (args: TestFunctionArgs, testInfo: TestInfo) => void | Promise<void>;

export type TestRunnerFunction = (page: Page, testInfo: TestInfo, testCase: TestCase<any>) => Promise<void>;

export type PreparedTestArgs = [string, object, TestFunction];

export type TestData<T> = {
    name: string;
    data: Partial<T>,
    setup?: (data: Partial<T>) => Promise<void>;
}
