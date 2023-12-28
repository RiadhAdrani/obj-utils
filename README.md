# obj-utils [![npm](https://img.shields.io/npm/v/@riadh-adrani/obj-utils?obj=blue)](https://www.npmjs.com/package/@riadh-adrani/obj-utils) [![CI/CD](https://github.com/RiadhAdrani/obj-utils/actions/workflows/checks.yml/badge.svg)](https://github.com/RiadhAdrani/obj-utils/actions/workflows/checks.yml)

Javascript object utilities.

Check documentation [`here`](https://riadhadrani.github.io/utils/object.html)

---

## Methods

### `isNumber`

checks if `o` is a number.

```ts
function isNumber(o: unknown): o is number;
```

### `isArray`

checks if `o` is an array.

```ts
function isArray<T>(o: unknown): o is Array<T>;
```

### `isObject`

checks if `o` is an object.

```ts
function isObject(o: unknown): o is object;
```

### `isNull`

checks if `o` is null.

```ts
function isNull(o: unknown): o is null;
```

### `isUndefined`

checks if `o` is undefined.

```ts
function isUndefined(o: unknown): o is undefined;
```

### `isBoolean`

checks if `o` is boolean.

```ts
function isBoolean(o: unknown): o is boolean;
```

### `isBigint`

checks if `o` is bigint.

```ts
function isBigint(o: unknown): o is bigint;
```

### `isSymbol`

checks if `o` is symbol.

```ts
function isSymbol(o: unknown): o is bigint;
```

### `isFunction`

checks if `o` is a function.

```ts
function isFunction<F = () => void>(o: unknown): o is F;
```

### `isFalsy`

checks if `o` is falsy.

```ts
function isFalsy(o: unknown): o is false | 0 | '' | null | undefined | null;
```

### `isPrimitive`

checks if `o` is a primitive.

```ts
function isPrimitive(
  o: unknown
): o is string | number | bigint | boolean | undefined | symbol | null;
```

### `hasProperty`

checks if `o` is an object with the given property.

```ts
function hasProperty<V = unknown, K extends string | number | symbol = string>(
  o: unknown,
  property: K
): o is { [P in K]: V };
```

### `areEqual`

checks if `obj1` is deeply and strictly equal to `obj2`.

```ts
function areEqual(obj1: unknown, obj2: unknown, depth?: number): boolean;
```

> you can set a maximum depth, it is set to `10` by default.

### `copy`

perform a deep copy of the given object.

```ts
function copy<T>(source: T): T;
```

### `copyKeys`

copy keys from an object to another with the possibility of ignoring some keys.

```ts
function copyKeys<F extends object, T extends object>(
  source: F,
  target: T,
  ...exclude: Array<StringWithAutoComplete<keyof F>>
```

### `forEachKey`

execute a callback for each key in an object.

```ts
function forEachKey<T extends object>(
  callback: (key: keyof T, value: T[keyof T], index: number) => void,
  object: T
): void;
```

### `getType`

a better version of `typeof` that diffirentiate `null`, `object` and `array`.

```ts
function getType(o: unknown): Type;
```

##### Type

```ts
export type Type =
  | 'undefined'
  | 'null'
  | 'boolean'
  | 'number'
  | 'bigint'
  | 'string'
  | 'symbol'
  | 'object'
  | 'array';
```

### `merge`

perform a deep merge of two or more objects.

```ts
function merge<S extends object, T extends object = S>(...objects: Array<S>): T;
```

> comparison are performed by `key`.

> new keys will be added.

> the function will try to mainting similar object structure, overrding keys only when types are different, using [`getType`](#gettype)

### `omit`

copy an object but omitting certain keys.

```ts
function omit<T extends object, K extends keyof T>(
  object: T,
  ...keys: Array<StringWithAutoComplete<keyof T | K>>
): Omit<T, K>;
```

### `pick`

create a new object of selected keys.

```ts
function pick<T extends object, K extends keyof T>(
  object: T,
  ...keys: Array<keyof T | K>
): Pick<T, K>;
```
