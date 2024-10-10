[**Playwright Testing Core Library**](../../../../../README.md) • **Docs**

***

[Playwright Testing Core Library](../../../../../README.md) / [Utils](../../../README.md) / [Timing](../README.md) / waitForAny

# Function: waitForAny()

> **waitForAny**(`conditions`, `options`?): `Promise`\<`void`\>

Waits for any of the specified conditions to be true within a timeout.

## Parameters

• **conditions**: [`ConditionFunc`](../../../../../type-aliases/ConditionFunc.md)[]

An array of condition functions to wait for.

• **options?**: `Partial`\<[`TimingOptions`](../../../../../type-aliases/TimingOptions.md)\> = `{}`

Optional timing parameters.

## Returns

`Promise`\<`void`\>

## Throws

If none of the conditions are met within the timeout.

## Throws

If all conditions fail or an error occurs.
