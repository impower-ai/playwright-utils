[**Playwright Testing Core Library**](../README.md) • **Docs**

***

[Playwright Testing Core Library](../README.md) / BasePage

# Class: `abstract` BasePage

Represents a base page object that implements the PageObject interface.

## Extends

- [`BaseObject`](BaseObject.md)

## Implements

- [`PageObject`](../interfaces/PageObject.md)

## Constructors

### new BasePage()

> **new BasePage**(`page`): [`BasePage`](BasePage.md)

Creates an instance of BasePage.

#### Parameters

• **page**: `Page`

The Page object representing the web page.

#### Returns

[`BasePage`](BasePage.md)

#### Overrides

[`BaseObject`](BaseObject.md).[`constructor`](BaseObject.md#constructors)

## Methods

### isLoaded()

> `abstract` **isLoaded**(): `Promise`\<`boolean`\>

Checks if the page is currently loaded.

#### Returns

`Promise`\<`boolean`\>

A promise that resolves when the check is complete.

#### Implementation of

[`PageObject`](../interfaces/PageObject.md).[`isLoaded`](../interfaces/PageObject.md#isloaded)

***

### waitUntilLoaded()

> `abstract` **waitUntilLoaded**(): `Promise`\<`void`\>

Waits until the page is fully loaded.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the page is loaded.

#### Implementation of

[`PageObject`](../interfaces/PageObject.md).[`waitUntilLoaded`](../interfaces/PageObject.md#waituntilloaded)
