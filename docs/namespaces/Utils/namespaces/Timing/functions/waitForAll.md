[**Playwright Testing Core Library**](../../../../../README.md) • **Docs**

***

[Playwright Testing Core Library](../../../../../README.md) / [Utils](../../../README.md) / [Timing](../README.md) / waitForAll

# Function: waitForAll()

> **waitForAll**(`conditions`, `options`?): `Promise`\<`void`\>

Waits for all specified conditions to be true within a timeout.

## Parameters

• **conditions**: [`ConditionFunc`](../../../../../type-aliases/ConditionFunc.md)[]

An array of condition functions to wait for.

• **options?**: `Partial`\<[`TimingOptions`](../../../../../type-aliases/TimingOptions.md)\> = `{}`

Optional timing parameters.

## Returns

`Promise`\<`void`\>

## Throws

If not all conditions are met within the timeout.

## Throws

If an error occurs while checking the conditions.
