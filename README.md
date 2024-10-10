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

## Modules

### **Core**
- [BasePage](docs/classes/BasePage.html): Base page object
- [BaseComponent](docs/classes/BaseComponent.html): Base component object
- [Test](docs/classes/Test.html): Utility class for test preparation and data-driven testing
- [TestCase](docs/classes/TestCase.html): Class to help manage generic test cases.

### **Types**
- [PageObject](docs/interfaces/PageObject.md): Interface for a generic page object.
- [RoutablePage](docs/interfaces/RoutablePage.md): Interface for a page which can be easily navigated to.
- [HydratableComponent](docs/interfaces/HydratableComponent.md): Interface for a data component that can be hydrated with component state.

### **Hooks**
- [NodeServer](docs/namespaces/Hooks/namespaces/NodeServer/README.md): Setup & Teardown hooks for managing a local node server.

### **Utils**
- [Timing](docs/namespaces/Utils/namespaces/Timing/README.md): Utilities for generic & conditional waiting. As well as playwright specific waiting scenarios.
- [Enum](docs/namespaces/Utils/namespaces/Enum/README.md): Utilites for working with basic and flaggable enums.

## Documentation

Comprehensive API documentation available under [docs](docs/README.md).