# Playwright Testing Core Library

## Purpose

This library provides a set of utilities, base classes, and hooks to enhance Playwright testing projects. It aims to:

- Standardize page object and component patterns
- Offer utility functions for common testing scenarios
- Provide type safety through TypeScript interfaces
- Facilitate timing and asynchronous operations in tests

## Installation

```bash
# http
npm install https://github.com/impower-ai/playwright-testing-core
```

```bash
# git+ssh
npm install git+ssh://github.com/impower-ai/playwright-testing-core
```

## Modules

### **Core**
#### Base classes for page objects and components

- [BasePage](./docs/classes/BasePage.html): Base page object
- [BaseComponent](./docs/classes/BaseComponent.html): Base component object
- [Test](./docs/classes/Test.html): Utility class for test preparation and data-driven testing
- [TestCase](./docs/classes/TestCase.html): Class to support data-driven testing

### **Types**
#### TypeScript interfaces for improved type safety

  - [PageObject](): Interface that defines
  - [RoutablePage](): Interface that defines a page which can be easily navigated to

### [**Hooks**](./docs/modules/Hooks.html)
#### Reusable hooks for common testing scenarios

### [**Utils**](./docs/modules/Utils.html)
#### Utility functions for timing, enum handling, and page interactions
