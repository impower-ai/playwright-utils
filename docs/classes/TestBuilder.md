[**Playwright Testing Core Library**](../README.md) • **Docs**

***

[Playwright Testing Core Library](../README.md) / TestBuilder

# Class: TestBuilder\<T\>

## Type Parameters

• **T**

## Constructors

### new TestBuilder()

> **new TestBuilder**\<`T`\>(`config`): [`TestBuilder`](TestBuilder.md)\<`T`\>

#### Parameters

• **config**: [`TestConfig`](../interfaces/TestConfig.md) = `TestConfigDefault`

#### Returns

[`TestBuilder`](TestBuilder.md)\<`T`\>

## Methods

### new()

> `static` **new**\<`T`\>(`config`): [`TestBuilder`](TestBuilder.md)\<`T`\>

#### Type Parameters

• **T**

#### Parameters

• **config**: [`TestConfig`](../interfaces/TestConfig.md) = `TestConfigDefault`

#### Returns

[`TestBuilder`](TestBuilder.md)\<`T`\>

***

### addAfterAllHook()

> **addAfterAllHook**(`name`, `callback`): `this`

#### Parameters

• **name**: `string`

• **callback**: [`TestHookCallback`](../type-aliases/TestHookCallback.md)

#### Returns

`this`

***

### addAfterEachHook()

> **addAfterEachHook**(`name`, `callback`): `this`

#### Parameters

• **name**: `string`

• **callback**: [`TestHookCallback`](../type-aliases/TestHookCallback.md)

#### Returns

`this`

***

### addBeforeAllHook()

> **addBeforeAllHook**(`name`, `callback`): `this`

#### Parameters

• **name**: `string`

• **callback**: [`TestHookCallback`](../type-aliases/TestHookCallback.md)

#### Returns

`this`

***

### addBeforeEachHook()

> **addBeforeEachHook**(`name`, `callback`): `this`

#### Parameters

• **name**: `string`

• **callback**: [`TestHookCallback`](../type-aliases/TestHookCallback.md)

#### Returns

`this`

***

### addCase()

#### addCase(testCase)

> **addCase**(`testCase`): `this`

##### Parameters

• **testCase**: [`TestCaseDefinition`](../interfaces/TestCaseDefinition.md)\<`T`\>

##### Returns

`this`

#### addCase(testCases)

> **addCase**(`testCases`): `this`

##### Parameters

• **testCases**: [`TestCaseDefinition`](../interfaces/TestCaseDefinition.md)\<`T`\>[]

##### Returns

`this`

***

### addRule()

#### addRule(rule)

> **addRule**(`rule`): `this`

##### Parameters

• **rule**: [`RuleDefinition`](../interfaces/RuleDefinition.md)\<`T`\>

##### Returns

`this`

#### addRule(rules)

> **addRule**(`rules`): `this`

##### Parameters

• **rules**: [`RuleDefinition`](../interfaces/RuleDefinition.md)\<`T`\>[]

##### Returns

`this`

***

### build()

> **build**(): [`TestOrchestrator`](TestOrchestrator.md)\<`T`\>

#### Returns

[`TestOrchestrator`](TestOrchestrator.md)\<`T`\>

***

### setup()

> **setup**(`callback`): `this`

#### Parameters

• **callback**: [`TestCaseCallback`](../type-aliases/TestCaseCallback.md)\<`T`\>

#### Returns

`this`

***

### teardown()

> **teardown**(`callback`): `this`

#### Parameters

• **callback**: [`TestCaseCallback`](../type-aliases/TestCaseCallback.md)\<`T`\>

#### Returns

`this`
