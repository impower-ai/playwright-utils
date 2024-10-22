[**Playwright Testing Core Library**](../README.md) • **Docs**

***

[Playwright Testing Core Library](../README.md) / RuleEngine

# Class: RuleEngine\<T\>

## Type Parameters

• **T**

## Constructors

### new RuleEngine()

> **new RuleEngine**\<`T`\>(`rules`): [`RuleEngine`](RuleEngine.md)\<`T`\>

#### Parameters

• **rules**: [`Rule`](Rule.md)\<`T`\>[]

#### Returns

[`RuleEngine`](RuleEngine.md)\<`T`\>

## Methods

### evaluate()

> **evaluate**(`id`, `data`): [`TestCaseValidationError`](../type-aliases/TestCaseValidationError.md)[]

#### Parameters

• **id**: `string`

• **data**: `Partial`\<`T`\>

#### Returns

[`TestCaseValidationError`](../type-aliases/TestCaseValidationError.md)[]

## Properties

### \_rules

> `readonly` **\_rules**: [`Rule`](Rule.md)\<`T`\>[]
