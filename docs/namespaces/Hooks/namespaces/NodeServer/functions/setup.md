[**Playwright Testing Core Library**](../../../../../README.md) • **Docs**

***

[Playwright Testing Core Library](../../../../../README.md) / [Hooks](../../../README.md) / [NodeServer](../README.md) / setup

# Function: setup()

> **setup**(`config`, `nodeServerPath`): `Promise`\<`void`\>

Sets up the test environment by starting a local node server.

## Parameters

• **config**: [`FullConfigWServerPID`](../../../../../interfaces/FullConfigWServerPID.md)

The configuration object that will store the server PID.

• **nodeServerPath**: `string`

The path to the node server script.

## Returns

`Promise`\<`void`\>

A promise that resolves when the setup is complete.

## Throws

If the server fails to start.
