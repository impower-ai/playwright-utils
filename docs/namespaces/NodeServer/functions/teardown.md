[**Playwright Testing Core Library**](../../../README.md) • **Docs**

***

[Playwright Testing Core Library](../../../README.md) / [NodeServer](../README.md) / teardown

# Function: teardown()

> **teardown**(`config`): `Promise`\<`void`\>

Tears down the test environment by closing the local node server.

## Parameters

• **config**: [`FullConfigWServerPID`](../../../interfaces/FullConfigWServerPID.md)

The configuration object containing the server PID.

## Returns

`Promise`\<`void`\>

A promise that resolves when the teardown is complete.

## Throws

If the server fails to close.
