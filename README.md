# Playwright Testing Core Library

## Installation

```bash
# http
npm install https://github.com/impower-ai/playwright-testing-core
```

```bash
# git+ssh
npm install git+ssh://github.com/impower-ai/playwright-testing-core
```

## Documentation

Comprehensive API documentation available under [docs](docs/README.md).

[Test](docs/classes/Test.md): Utility class for test preparation and data-driven testing
[TestCase](docs/classes/TestCase.md): Class to help manage generic test cases.

### **Base**
- [BasePage](docs/classes/BasePage.md): Base page object
- [BaseComponent](docs/classes/BaseComponent.md): Base component object

### **Types**
- [PageObject](docs/interfaces/PageObject.md): Interface for a generic page object.
- [RoutablePage](docs/interfaces/RoutablePage.md): Interface for a page which can be easily navigated to.
- [HydratableComponent](docs/interfaces/HydratableComponent.md): Interface for a data component that can be hydrated with component state.

### **Hooks**
- [NodeServer](docs/namespaces/Hooks/namespaces/NodeServer/README.md): Setup & Teardown hooks for managing a local node server.

### **Utils**
- [Timing](docs/namespaces/Utils/namespaces/Timing/README.md): Utilities for generic & conditional waiting. As well as playwright specific waiting scenarios.
- [Enum](docs/namespaces/Utils/namespaces/Enum/README.md): Utilites for working with basic and flaggable enums.
