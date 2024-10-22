[**Playwright Testing Core Library**](../README.md) • **Docs**

***

[Playwright Testing Core Library](../README.md) / Timing

# Variable: Timing

> `const` **Timing**: `object`

## Type declaration

### createSafeCondition()

> **createSafeCondition**: (`condition`) => `Promise`\<`boolean`\>

Wraps a condition function to safely execute it and return a boolean result.

#### Parameters

• **condition**: [`ConditionFunc`](../type-aliases/ConditionFunc.md)

The condition function to execute.

#### Returns

`Promise`\<`boolean`\>

A Promise that resolves to true if the condition is met, false otherwise.

### createTimeoutPromise()

> **createTimeoutPromise**: (`timeout`) => `Promise`\<`never`\>

Creates a Promise that rejects after a specified timeout.

#### Parameters

• **timeout**: `number`

The timeout duration in milliseconds.

#### Returns

`Promise`\<`never`\>

A Promise that rejects with a TimeoutElapsedError after the specified timeout.

### delay()

> **delay**: (`timeout`) => `Promise`\<`void`\>

Creates a delay for a specified duration.

#### Parameters

• **timeout**: `number`

The delay duration in milliseconds.

#### Returns

`Promise`\<`void`\>

A Promise that resolves after the specified delay.

### waitFor()

> **waitFor**: (`condition`, `options`?) => `Promise`\<`void`\>

Waits for a condition to be true within a specified timeout.

#### Parameters

• **condition**: [`ConditionFunc`](../type-aliases/ConditionFunc.md)

The condition to wait for.

• **options?**: `Partial`\<`Pick`\<[`TimingOptions`](../type-aliases/TimingOptions.md), `"timeout"` \| `"pollInterval"`\>\> = `{}`

Optional timing parameters.

#### Returns

`Promise`\<`void`\>

#### Throws

If the condition is not met within the timeout.

#### Throws

If an error occurs while checking the condition.

### waitForAll()

> **waitForAll**: (`conditions`, `options`?) => `Promise`\<`void`\>

Waits for all specified conditions to be true within a timeout.

#### Parameters

• **conditions**: [`ConditionFunc`](../type-aliases/ConditionFunc.md)[]

An array of condition functions to wait for.

• **options?**: `Partial`\<[`TimingOptions`](../type-aliases/TimingOptions.md)\> = `{}`

Optional timing parameters.

#### Returns

`Promise`\<`void`\>

#### Throws

If not all conditions are met within the timeout.

#### Throws

If an error occurs while checking the conditions.

### waitForAny()

> **waitForAny**: (`conditions`, `options`?) => `Promise`\<`void`\>

Waits for any of the specified conditions to be true within a timeout.

#### Parameters

• **conditions**: [`ConditionFunc`](../type-aliases/ConditionFunc.md)[]

An array of condition functions to wait for.

• **options?**: `Partial`\<[`TimingOptions`](../type-aliases/TimingOptions.md)\> = `{}`

Optional timing parameters.

#### Returns

`Promise`\<`void`\>

#### Throws

If none of the conditions are met within the timeout.

#### Throws

If all conditions fail or an error occurs.

### waitForEither()

> **waitForEither**: (`condition1`, `condition2`, `options`?) => `Promise`\<`void`\>

Waits for either of two conditions to be true within a timeout.

#### Parameters

• **condition1**: [`ConditionFunc`](../type-aliases/ConditionFunc.md)

The first condition function to wait for.

• **condition2**: [`ConditionFunc`](../type-aliases/ConditionFunc.md)

The second condition function to wait for.

• **options?**: `Partial`\<[`TimingOptions`](../type-aliases/TimingOptions.md)\> = `{}`

Optional timing parameters.

#### Returns

`Promise`\<`void`\>

#### Throws

If neither condition is met within the timeout.

### waitForStableValue()

> **waitForStableValue**: \<`T`\>(`valueFunc`, `options`?) => `Promise`\<`T`\>

Waits for a value to stabilize (remain unchanged) within a specified timeout.

#### Type Parameters

• **T**

The type of the value being checked.

#### Parameters

• **valueFunc**

A function that returns the value to check for stability.

• **options?**: `Partial`\<[`TimingOptions`](../type-aliases/TimingOptions.md)\> = `{}`

Optional timing parameters.

#### Returns

`Promise`\<`T`\>

A Promise that resolves to the stable value.

#### Throws

If the value does not stabilize within the timeout.

### waitForUrlMatch()

> **waitForUrlMatch**: (`page`, `urlPattern`, `options`?) => `Promise`\<`void`\>

Waits for a URL to match a specified pattern within a timeout.

#### Parameters

• **page**: `Page`

The Playwright Page object to check the URL against.

• **urlPattern**: `RegExp`

The regular expression pattern to match the URL against.

• **options?**: `Partial`\<`Pick`\<[`TimingOptions`](../type-aliases/TimingOptions.md), `"timeout"` \| `"pollInterval"`\>\> = `{}`

Optional timing parameters.

#### Returns

`Promise`\<`void`\>

#### Throws

If the URL does not match the pattern within the timeout.

### waitToAppearAndDisappear()

> **waitToAppearAndDisappear**: (`locator`) => `Promise`\<`void`\>

Waits for an element to appear and then disappear within a timeout.

#### Parameters

• **locator**: `Locator`

The Playwright Locator for the element to wait for.

#### Returns

`Promise`\<`void`\>

#### Throws

If the element does not appear and disappear as expected.
