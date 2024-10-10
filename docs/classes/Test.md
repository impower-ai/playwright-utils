[**Playwright Testing Core Library**](../README.md) • **Docs**

***

[Playwright Testing Core Library](../README.md) / Test

# Class: Test

Utility class for preparing and running tests.

## Constructors

### new Test()

> **new Test**(): [`Test`](Test.md)

#### Returns

[`Test`](Test.md)

## Methods

### prepare()

> `static` **prepare**(`testData`, `testRunner`): [`PreparedTestArgs`](../type-aliases/PreparedTestArgs.md)

Prepares a test for execution.

#### Parameters

• **testData**: [`TestData`](../type-aliases/TestData.md)\<`any`\>

The test data.

• **testRunner**: [`TestRunnerFunction`](../type-aliases/TestRunnerFunction.md)

The function to run the test.

#### Returns

[`PreparedTestArgs`](../type-aliases/PreparedTestArgs.md)

An array containing the test name, options, and the test function.
