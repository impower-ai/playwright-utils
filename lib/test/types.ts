import {
    TestInfo as PlaywrightTestInfo,
    PlaywrightTestArgs,
    PlaywrightTestOptions,
    PlaywrightWorkerArgs,
    PlaywrightWorkerOptions,
    Page
} from "@playwright/test";
import TestCase, { TestCaseValidationErrorTypes } from "./test.case";
import { ZodObject, ZodRawShape } from "zod";

// Core Test Types (Mostly overriden playwright types)

export interface TestInfo extends PlaywrightTestInfo {
	testCase?: TestCase<any>
}

export type TestFunctionArgs = PlaywrightTestArgs & PlaywrightTestOptions & PlaywrightWorkerArgs & PlaywrightWorkerOptions;

export type TestFunction = (args: TestFunctionArgs, testInfo: TestInfo) => void | Promise<void>;

export type TestRunnerFunction = (page: Page, testInfo: TestInfo, testCase: TestCase<any>) => Promise<void>;

export type PreparedTestArgs = [string, object, TestFunction];

export interface TestConfig {
    validateTypes?: boolean;
    validateRules?: boolean;
	ignoreValidation?: boolean;
}

// Test Case Types

export type TestCaseCallback<T> = (id: string, data: Partial<T>) => Promise<void> | void;

export interface TestCaseDefinition<T> {
    schema: ZodObject<ZodRawShape>;
    name: string;
    data: Partial<T>;
    setup?: TestCaseCallback<T>;
    teardown?: TestCaseCallback<T>;
}

export type TestCaseValidationError = { type: TestCaseValidationErrorTypes, message: string };

// Test Hook

export type TestHookCallback = () => Promise<void> | void;

// Test Rule

export type RuleCallback<T> = (data: Partial<T>) => Promise<boolean> | boolean;

export interface RuleDefinition<T> {
    id: number;
    name: string;
    check: RuleCallback<T>,
    dependsOn?: number[]
}