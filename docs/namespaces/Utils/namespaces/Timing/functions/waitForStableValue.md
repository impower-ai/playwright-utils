[**Playwright Testing Core Library**](../../../../../README.md) • **Docs**

***

[Playwright Testing Core Library](../../../../../README.md) / [Utils](../../../README.md) / [Timing](../README.md) / waitForStableValue

# Function: waitForStableValue()

> **waitForStableValue**\<`T`\>(`valueFunc`, `options`?): `Promise`\<`T`\>

Waits for a value to stabilize (remain unchanged) within a specified timeout.

## Type Parameters

• **T**

The type of the value being checked.

## Parameters

• **valueFunc**

A function that returns the value to check for stability.

• **options?**: `Partial`\<[`TimingOptions`](../../../../../type-aliases/TimingOptions.md)\> = `{}`

Optional timing parameters.

## Returns

`Promise`\<`T`\>

A Promise that resolves to the stable value.

## Throws

If the value does not stabilize within the timeout.
