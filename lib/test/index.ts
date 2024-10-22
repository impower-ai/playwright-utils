/**
 * @module Test
 * Core test framework functionality for building and running data-driven tests.
 */

import TestOrchestrator, { TestConfigDefault } from "./test.orchestrator";
import TestBuilder from './test.builder';
import TestCase, { TestCaseValidationErrorTypes } from './test.case';
import TestHook, { TestHookTypes } from './test.hook';
import Rule from './rule';
import RuleEngine from './rule.engine';

import { Test } from './test';

export {
    Test,
    TestConfigDefault,
    TestOrchestrator, 
    TestBuilder,
    TestCase,
    TestCaseValidationErrorTypes,
    TestHook,
    TestHookTypes,
    Rule,
    RuleEngine
};

export * from './types';

export const Testing = {
    Test,
    TestConfigDefault,
    TestOrchestrator,
    TestBuilder,
    TestCase,
    TestHook,
    Rule,
    RuleEngine
} as const;

export default Testing;