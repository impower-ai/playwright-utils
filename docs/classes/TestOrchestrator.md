[**Playwright Testing Core Library**](../README.md) • **Docs**

***

[Playwright Testing Core Library](../README.md) / TestOrchestrator

# Class: TestOrchestrator\<T\>

## Type Parameters

• **T**

## Constructors

### new TestOrchestrator()

> **new TestOrchestrator**\<`T`\>(`cases`, `ruleEngine`, `hooks`, `config`): [`TestOrchestrator`](TestOrchestrator.md)\<`T`\>

#### Parameters

• **cases**: [`TestCase`](TestCase.md)\<`T`\>[]

• **ruleEngine**: [`RuleEngine`](RuleEngine.md)\<`T`\>

• **hooks**: [`TestHook`](TestHook.md)[]

• **config**: [`TestConfig`](../interfaces/TestConfig.md) = `TestConfigDefault`

#### Returns

[`TestOrchestrator`](TestOrchestrator.md)\<`T`\>

## Methods

### start()

> **start**(`runner`): `void`

#### Parameters

• **runner**: [`TestRunnerFunction`](../type-aliases/TestRunnerFunction.md)

#### Returns

`void`

## Properties

### cases

> `readonly` **cases**: [`TestCase`](TestCase.md)\<`T`\>[]

***

### config

> `readonly` **config**: [`TestConfig`](../interfaces/TestConfig.md) = `TestConfigDefault`

***

### hooks

> `readonly` **hooks**: [`TestHook`](TestHook.md)[]

***

### ruleEngine

> `readonly` **ruleEngine**: [`RuleEngine`](RuleEngine.md)\<`T`\>
