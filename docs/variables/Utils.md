[**Playwright Testing Core Library**](../README.md) • **Docs**

***

[Playwright Testing Core Library](../README.md) / Utils

# Variable: Utils

> `const` **Utils**: `object`

## Type declaration

### Enum

> **Enum**: `object`

### Enum.addFlag()

> **addFlag**: (`value`, `flag`, `enumType`) => `number`

Adds a flag to a value for a flag enum.

#### Parameters

• **value**: `number`

The original value.

• **flag**: `number`

The flag to add.

• **enumType**: `object`

The enum object.

#### Returns

`number`

The new value with the added flag.

#### Throws

If the enum is not a flag enum.

### Enum.getFlagString()

> **getFlagString**: \<`T`\>(`enumObj`, `flags`) => `string`

Gets a string representation of enum flags.

#### Type Parameters

• **T** *extends* `object`

#### Parameters

• **enumObj**: `T`

The enum object.

• **flags**: `number`

The flags to convert to string.

#### Returns

`string`

A string representation of the flags.

### Enum.getValue()

> **getValue**: (`enumObj`, `stringValue`) => `number` \| `undefined`

Retrieves the numeric value associated with a string key in an enum object.

#### Parameters

• **enumObj**: `any`

The enum object to search in.

• **stringValue**: `string`

The string key to look up in the enum.

#### Returns

`number` \| `undefined`

The numeric value associated with the string key, or undefined if the key doesn't exist in the enum.

### Enum.getValues()

> **getValues**: (`enumObj`) => `string`[] \| `number`[]

Gets all values from an enum object.

#### Parameters

• **enumObj**: `object`

The enum object.

#### Returns

`string`[] \| `number`[]

An array of enum values.

### Enum.hasFlag()

> **hasFlag**: (`value`, `flag`, `enumType`) => `boolean`

Checks if a value has a specific flag.

#### Parameters

• **value**: `string` \| `number`

The value to check.

• **flag**: `string` \| `number`

The flag to check for.

• **enumType**: `object`

The enum object.

#### Returns

`boolean`

True if the value has the flag, false otherwise.

### Enum.isFlag()

> **isFlag**: (`enumObj`) => `boolean`

Checks if the given enum object is a flag enum.

#### Parameters

• **enumObj**: `object`

The enum object to check.

#### Returns

`boolean`

True if the enum is a flag enum, false otherwise.

### Enum.isValid()

> **isValid**: (`value`, `enumType`) => `boolean`

Validates if a given value is a valid enum value.

#### Parameters

• **value**: `any`

The value to validate.

• **enumType**: `object`

The enum object to validate against.

#### Returns

`boolean`

True if the value is valid, false otherwise.

### Enum.isValidProperty()

> **isValidProperty**: (`json`, `property`, `enumType`) => `number` \| `string` \| `null`

Validates an enum property in a JSON object.

#### Parameters

• **json**: `any`

The JSON object.

• **property**: `string`

The property name to validate.

• **enumType**: `object`

The enum object to validate against.

#### Returns

`number` \| `string` \| `null`

The validated enum value, or null if invalid.

TODO: This method should return a boolean

### Enum.removeFlag()

> **removeFlag**: (`value`, `flag`, `enumType`) => `number`

Removes a flag from a value for a flag enum.

#### Parameters

• **value**: `number`

The original value.

• **flag**: `number`

The flag to remove.

• **enumType**: `object`

The enum object.

#### Returns

`number`

The new value with the removed flag.

#### Throws

If the enum is not a flag enum.

### Enum.toggleFlag()

> **toggleFlag**: (`value`, `flag`, `enumType`) => `number`

Toggles a flag in a value for a flag enum.

#### Parameters

• **value**: `number`

The original value.

• **flag**: `number`

The flag to toggle.

• **enumType**: `object`

The enum object.

#### Returns

`number`

The new value with the toggled flag.

#### Throws

If the enum is not a flag enum.

### Random

> **Random**: `object`

### Random.getRandomInteger()

> **getRandomInteger**: (`min`, `max`) => `number`

Generates a random integer between the specified minimum and maximum values (inclusive).

#### Parameters

• **min**: `number`

The lower bound of the range (inclusive).

• **max**: `number`

The upper bound of the range (inclusive).

#### Returns

`number`

A random integer between min and max (inclusive).

### Tag

> **Tag**: `object`

### Tag.formatTag()

> **formatTag**: (`text`) => `string`

#### Parameters

• **text**: `string`

#### Returns

`string`

### Timing

> **Timing**: `object`

### Timing.createSafeCondition()

> **createSafeCondition**: (`condition`) => `Promise`\<`boolean`\>

Wraps a condition function to safely execute it and return a boolean result.

#### Parameters

• **condition**: [`ConditionFunc`](../type-aliases/ConditionFunc.md)

The condition function to execute.

#### Returns

`Promise`\<`boolean`\>

A Promise that resolves to true if the condition is met, false otherwise.

### Timing.createTimeoutPromise()

> **createTimeoutPromise**: (`timeout`) => `Promise`\<`never`\>

Creates a Promise that rejects after a specified timeout.

#### Parameters

• **timeout**: `number`

The timeout duration in milliseconds.

#### Returns

`Promise`\<`never`\>

A Promise that rejects with a TimeoutElapsedError after the specified timeout.

### Timing.delay()

> **delay**: (`timeout`) => `Promise`\<`void`\>

Creates a delay for a specified duration.

#### Parameters

• **timeout**: `number`

The delay duration in milliseconds.

#### Returns

`Promise`\<`void`\>

A Promise that resolves after the specified delay.

### Timing.waitFor()

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

### Timing.waitForAll()

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

### Timing.waitForAny()

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

### Timing.waitForEither()

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

### Timing.waitForStableValue()

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

### Timing.waitForUrlMatch()

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

### Timing.waitToAppearAndDisappear()

> **waitToAppearAndDisappear**: (`locator`) => `Promise`\<`void`\>

Waits for an element to appear and then disappear within a timeout.

#### Parameters

• **locator**: `Locator`

The Playwright Locator for the element to wait for.

#### Returns

`Promise`\<`void`\>

#### Throws

If the element does not appear and disappear as expected.

### Validate

> **Validate**: `object`

### Validate.isEmpty()

> **isEmpty**: (`obj`) => `boolean`

#### Parameters

• **obj**: `Record`\<`string`, `any`\>

#### Returns

`boolean`
