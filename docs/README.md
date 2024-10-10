**Playwright Testing Core Library** • **Docs**

***

# Playwright Testing Core Library

This module provides utilities for Playwright testing, supporting both namespace and individual imports.

## Remarks

The library is organized into several modules:
- Core: Base classes for page objects and components
- Types: TypeScript interfaces for type safety
- Hooks: Reusable hooks for common testing scenarios
- Utils: Utility functions for timing, enum handling, etc.

## Examples

```ts
// Namespace import
import { Utils } from "playwright-testing-core";
Utils.Timing.waitFor(...);
```

```ts
// Individual import
import { Timing } from "playwright-testing-core";
Timing.waitFor(...);
```

## Namespaces

- [Hooks](namespaces/Hooks/README.md)
- [Utils](namespaces/Utils/README.md)

## Classes

- [BaseComponent](classes/BaseComponent.md)
- [BaseHydratableComponent](classes/BaseHydratableComponent.md)
- [BaseObject](classes/BaseObject.md)
- [BasePage](classes/BasePage.md)
- [ConditionError](classes/ConditionError.md)
- [Test](classes/Test.md)
- [TestCase](classes/TestCase.md)
- [TimeoutElapsedError](classes/TimeoutElapsedError.md)

## Interfaces

- [DataComponent](interfaces/DataComponent.md)
- [FullConfigWServerPID](interfaces/FullConfigWServerPID.md)
- [HydratableComponent](interfaces/HydratableComponent.md)
- [PageObject](interfaces/PageObject.md)
- [RoutablePage](interfaces/RoutablePage.md)
- [TestConfigWServerPID](interfaces/TestConfigWServerPID.md)

## Type Aliases

- [ConditionFunc](type-aliases/ConditionFunc.md)
- [Credentials](type-aliases/Credentials.md)
- [PreparedTestArgs](type-aliases/PreparedTestArgs.md)
- [TestData](type-aliases/TestData.md)
- [TestFunction](type-aliases/TestFunction.md)
- [TestFunctionArgs](type-aliases/TestFunctionArgs.md)
- [TestRunnerFunction](type-aliases/TestRunnerFunction.md)
- [TimingOptions](type-aliases/TimingOptions.md)
- [UserPassCredentials](type-aliases/UserPassCredentials.md)
