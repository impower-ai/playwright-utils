[**Playwright Testing Core Library**](../README.md) • **Docs**

***

[Playwright Testing Core Library](../README.md) / Enum

# Variable: Enum

> `const` **Enum**: `object`

## Type declaration

### addFlag()

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

### getFlagString()

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

### getValue()

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

### getValues()

> **getValues**: (`enumObj`) => `string`[] \| `number`[]

Gets all values from an enum object.

#### Parameters

• **enumObj**: `object`

The enum object.

#### Returns

`string`[] \| `number`[]

An array of enum values.

### hasFlag()

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

### isFlag()

> **isFlag**: (`enumObj`) => `boolean`

Checks if the given enum object is a flag enum.

#### Parameters

• **enumObj**: `object`

The enum object to check.

#### Returns

`boolean`

True if the enum is a flag enum, false otherwise.

### isValid()

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

### isValidProperty()

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

### removeFlag()

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

### toggleFlag()

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
