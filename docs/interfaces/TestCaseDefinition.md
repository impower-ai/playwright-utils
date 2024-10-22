[**Playwright Testing Core Library**](../README.md) • **Docs**

***

[Playwright Testing Core Library](../README.md) / TestCaseDefinition

# Interface: TestCaseDefinition\<T\>

## Type Parameters

• **T**

## Properties

### data

> **data**: `Partial`\<`T`\>

***

### name

> **name**: `string`

***

### schema

> **schema**: `ZodObject`\<`ZodRawShape`, `UnknownKeysParam`, `ZodTypeAny`, `object`, `object`\>

***

### setup?

> `optional` **setup**: [`TestCaseCallback`](../type-aliases/TestCaseCallback.md)\<`T`\>

***

### teardown?

> `optional` **teardown**: [`TestCaseCallback`](../type-aliases/TestCaseCallback.md)\<`T`\>
