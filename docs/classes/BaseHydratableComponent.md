[**Playwright Testing Core Library**](../README.md) • **Docs**

***

[Playwright Testing Core Library](../README.md) / BaseHydratableComponent

# Class: `abstract` BaseHydratableComponent\<T\>

Represents a base hydratable component.

## Extends

- [`BaseComponent`](BaseComponent.md)

## Type Parameters

• **T**

## Implements

- [`HydratableComponent`](../interfaces/HydratableComponent.md)\<`T`\>

## Constructors

### new BaseHydratableComponent()

> **new BaseHydratableComponent**\<`T`\>(`page`): [`BaseHydratableComponent`](BaseHydratableComponent.md)\<`T`\>

Creates an instance of BaseHydratableComponent.

#### Parameters

• **page**: `Page`

The page object associated with this component.

#### Returns

[`BaseHydratableComponent`](BaseHydratableComponent.md)\<`T`\>

#### Overrides

[`BaseComponent`](BaseComponent.md).[`constructor`](BaseComponent.md#constructors)

## Methods

### hydrate()

> `abstract` **hydrate**(): `Promise`\<`void`\>

Hydrates the component.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the component is hydrated.

#### Implementation of

[`HydratableComponent`](../interfaces/HydratableComponent.md).[`hydrate`](../interfaces/HydratableComponent.md#hydrate)

***

### isHydrated()

> `abstract` **isHydrated**(): `Promise`\<`boolean`\>

Checks if the component is hydrated.

#### Returns

`Promise`\<`boolean`\>

A promise that resolves to true if the component is hydrated, false otherwise.

#### Implementation of

[`HydratableComponent`](../interfaces/HydratableComponent.md).[`isHydrated`](../interfaces/HydratableComponent.md#ishydrated)

***

### waitForHydration()

> **waitForHydration**(`timeout`?): `Promise`\<`void`\>

Waits for the component to be hydrated.

#### Parameters

• **timeout?**: `number` = `30000`

The maximum time to wait for hydration in milliseconds.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the component is hydrated.

#### Implementation of

[`HydratableComponent`](../interfaces/HydratableComponent.md).[`waitForHydration`](../interfaces/HydratableComponent.md#waitforhydration)

## Properties

### data

> `readonly` **data**: `Partial`\<`T`\> = `{}`

The data associated with the component.

#### Implementation of

[`HydratableComponent`](../interfaces/HydratableComponent.md).[`data`](../interfaces/HydratableComponent.md#data)
