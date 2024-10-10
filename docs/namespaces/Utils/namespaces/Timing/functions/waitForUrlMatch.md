[**Playwright Testing Core Library**](../../../../../README.md) • **Docs**

***

[Playwright Testing Core Library](../../../../../README.md) / [Utils](../../../README.md) / [Timing](../README.md) / waitForUrlMatch

# Function: waitForUrlMatch()

> **waitForUrlMatch**(`page`, `urlPattern`, `options`?): `Promise`\<`void`\>

Waits for a URL to match a specified pattern within a timeout.

## Parameters

• **page**: `Page`

The Playwright Page object to check the URL against.

• **urlPattern**: `RegExp`

The regular expression pattern to match the URL against.

• **options?**: `Partial`\<`Pick`\<[`TimingOptions`](../../../../../type-aliases/TimingOptions.md), `"timeout"` \| `"pollInterval"`\>\> = `{}`

Optional timing parameters.

## Returns

`Promise`\<`void`\>

## Throws

If the URL does not match the pattern within the timeout.
