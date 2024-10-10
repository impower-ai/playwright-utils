[**Playwright Testing Core Library**](../../../../../README.md) • **Docs**

***

[Playwright Testing Core Library](../../../../../README.md) / [Utils](../../../README.md) / [Timing](../README.md) / createSafeCondition

# Function: createSafeCondition()

> **createSafeCondition**(`condition`): `Promise`\<`boolean`\>

Wraps a condition function to safely execute it and return a boolean result.

## Parameters

• **condition**: [`ConditionFunc`](../../../../../type-aliases/ConditionFunc.md)

The condition function to execute.

## Returns

`Promise`\<`boolean`\>

A Promise that resolves to true if the condition is met, false otherwise.
