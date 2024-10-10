/**
 * @packageDocumentation
 * This module provides utilities for Playwright testing, supporting both namespace and individual imports.
 * 
 * @remarks
 * The library is organized into several modules:
 * - Core: Base classes for page objects and components
 * - Types: TypeScript interfaces for type safety
 * - Hooks: Reusable hooks for common testing scenarios
 * - Utils: Utility functions for timing, enum handling, etc.
 * 
 * @example
 * // Namespace import
 * import { Utils } from "playwright-testing-core";
 * Utils.Timing.waitFor(...);
 * 
 * @example
 * // Individual import
 * import { Timing } from "playwright-testing-core";
 * Timing.waitFor(...);
 */

/**
 * Core module containing base classes for page objects and components.
 * @namespace
 */
export * from "./core";

/**
 * Types module containing TypeScript interfaces for type safety.
 * @namespace
 */
export * from "./types";

/**
 * Hooks module containing reusable hooks for common testing scenarios.
 * @namespace
 */
export * as Hooks from "./hooks";

/**
 * Utils module containing utility functions for timing, enum handling, etc.
 * @namespace
 */
export * as Utils from "./utils";