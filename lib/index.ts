/**
 * @packageDocumentation
 * A comprehensive testing utility framework built on top of Playwright.
 * Provides utilities for building maintainable, data-driven test suites.
 */

import { Utils } from './utils';
import { Hooks } from './hooks';
import { Testing } from './test';
import { Types } from './types';

// Core - Base classes and interfaces
export * from './core';

// Utils - Utility functions
export * from './utils';

// Hooks - Global lifecycle hooks
export * from './hooks';

// Test - Test framework functionality
export * from './test';

// Types - Common type definitions
export * from './types';

// Error definitions
export * from './errors';

// Namespace exports
export {
    Utils,
    Hooks,
    Testing,
    Types
};

// Default export of all namespaces
export default {
    Utils,
    Hooks,
    Testing,
    Types
} as const;