[**Playwright Testing Core Library**](../../../../../README.md) • **Docs**

***

[Playwright Testing Core Library](../../../../../README.md) / [Utils](../../../README.md) / [Timing](../README.md) / waitForEither

# Function: waitForEither()

> **waitForEither**(`condition1`, `condition2`, `options`?): `Promise`\<`void`\>

Waits for either of two conditions to be true within a timeout.

## Parameters

• **condition1**: [`ConditionFunc`](../../../../../type-aliases/ConditionFunc.md)

The first condition function to wait for.

• **condition2**: [`ConditionFunc`](../../../../../type-aliases/ConditionFunc.md)

The second condition function to wait for.

• **options?**: `Partial`\<[`TimingOptions`](../../../../../type-aliases/TimingOptions.md)\> = `{}`

Optional timing parameters.

## Returns

`Promise`\<`void`\>

## Throws

If neither condition is met within the timeout.
