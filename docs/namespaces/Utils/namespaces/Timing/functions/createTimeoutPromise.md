[**Playwright Testing Core Library**](../../../../../README.md) • **Docs**

***

[Playwright Testing Core Library](../../../../../README.md) / [Utils](../../../README.md) / [Timing](../README.md) / createTimeoutPromise

# Function: createTimeoutPromise()

> **createTimeoutPromise**(`timeout`): `Promise`\<`never`\>

Creates a Promise that rejects after a specified timeout.

## Parameters

• **timeout**: `number`

The timeout duration in milliseconds.

## Returns

`Promise`\<`never`\>

A Promise that rejects with a TimeoutElapsedError after the specified timeout.
