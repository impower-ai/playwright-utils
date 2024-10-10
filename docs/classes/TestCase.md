[**Playwright Testing Core Library**](../README.md) • **Docs**

***

[Playwright Testing Core Library](../README.md) / TestCase

# Class: TestCase\<T\>

Represents a test case with associated data and setup.

## Type Parameters

• **T**

The type of the test data.

## Constructors

### new TestCase()

> **new TestCase**\<`T`\>(`data`): [`TestCase`](TestCase.md)\<`T`\>

#### Parameters

• **data**: [`TestData`](../type-aliases/TestData.md)\<`T`\>

#### Returns

[`TestCase`](TestCase.md)\<`T`\>

## Methods

### init()

> **init**(): `Promise`\<`void`\>

Initializes the test case by running the setup function if provided.

#### Returns

`Promise`\<`void`\>

A promise that resolves when initialization is complete.

## Properties

### data

> `readonly` **data**: `Partial`\<`T`\>

***

### id

> `readonly` **id**: `string`

***

### name

> `readonly` **name**: `string`
