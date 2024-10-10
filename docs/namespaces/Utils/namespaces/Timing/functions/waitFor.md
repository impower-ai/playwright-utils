[**Playwright Testing Core Library**](../../../../../README.md) • **Docs**

***

[Playwright Testing Core Library](../../../../../README.md) / [Utils](../../../README.md) / [Timing](../README.md) / waitFor

# Function: waitFor()

> **waitFor**(`condition`, `options`?): `Promise`\<`void`\>

Waits for a condition to be true within a specified timeout.

## Parameters

• **condition**: [`ConditionFunc`](../../../../../type-aliases/ConditionFunc.md)

The condition to wait for.

• **options?**: `Partial`\<`Pick`\<[`TimingOptions`](../../../../../type-aliases/TimingOptions.md), `"timeout"` \| `"pollInterval"`\>\> = `{}`

Optional timing parameters.

## Returns

`Promise`\<`void`\>

## Throws

If the condition is not met within the timeout.

## Throws

If an error occurs while checking the condition.
