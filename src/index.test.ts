import {
  Type,
  areEqual,
  copy,
  copyKeys,
  forEachKey,
  hasProperty,
  merge,
  omit,
  pick,
  isFunction,
  isFalsy,
  getType,
  isPrimitive,
} from './index.js';
import { it, expect, describe, vitest } from 'vitest';

describe('areEqual', () => {
  const fn = () => {
    ('');
  };

  const obj1 = {
    count: 0,
    update: fn,
  };

  const obj2 = {
    count: 0,
    update: fn,
  };

  it.each([
    [obj1, obj2, true],
    [
      obj1,
      {
        count: 0,
        update: () => 0,
      },
      false,
    ],
    ['', '', true],
    ['', 'a', false],
    [1, 1, true],
    [1, 2, false],
    [null, null, true],
    [undefined, undefined, true],
    [false, false, true],
    [false, true, false],
    [{}, {}, true],
    [{}, { key: '' }, false],
    [[], [], true],
    [[], [1], false],
    [['hello'], ['hello'], true],
    [[{}], [{}], true],
    [[{}, {}, {}], [{}, {}, {}], true],
    [
      { name: 'recursive', type: 'framework', age: 1 },
      { name: 'recursive', type: 'framework', age: 1 },
      true,
    ],
    [
      { name: 'recursive', type: 'framework', age: 1 },
      { name: 'recursed', type: 'framework', age: 1 },
      false,
    ],
    [
      { name: 'recursive', type: 'framework', age: 1 },
      { name: 'recursive', type: 'framework' },
      false,
    ],
    [
      { 1: { 2: { 3: { 4: { 5: { 6: { 7: { 8: { 9: { 10: 11 } } } } } } } } } },
      { 1: { 2: { 3: { 4: { 5: { 6: { 7: { 8: { 9: { 10: 11 } } } } } } } } } },
      true,
    ],
    [
      { 1: { 2: { 3: { 4: { 5: { 6: { 7: { 8: { 9: { 10: { 11: { 12: '' } } } } } } } } } } } },
      { 1: { 2: { 3: { 4: { 5: { 6: { 7: { 8: { 9: { 10: { 11: { 12: 13 } } } } } } } } } } } },
      true,
    ],
    [
      {
        a: {
          a: {
            a: { a: { a: '', b: '', c: '', d: '' }, b: '', c: '', d: '' },
            b: '',
            c: '',
            d: '',
          },
          b: '',
          c: '',
          d: '',
        },
        b: {
          a: {
            a: { a: { a: '', b: '', c: '', d: '' }, b: '', c: '', d: '' },
            b: '',
            c: '',
            d: '',
          },
          b: '',
          c: '',
          d: '',
        },
        c: {
          a: {
            a: { a: { a: '', b: '', c: '', d: '' }, b: '', c: '', d: '' },
            b: '',
            c: '',
            d: '',
          },
          b: '',
          c: '',
          d: '',
        },
        d: {
          a: {
            a: { a: { a: '', b: '', c: '', d: '' }, b: '', c: '', d: '' },
            b: '',
            c: '',
            d: '',
          },
          b: '',
          c: '',
          d: '',
        },
      },
      {
        a: {
          a: {
            a: { a: { a: '', b: '', c: '', d: '' }, b: '', c: '', d: '' },
            b: '',
            c: '',
            d: '',
          },
          b: '',
          c: '',
          d: '',
        },
        b: {
          a: {
            a: { a: { a: '', b: '', c: '', d: '' }, b: '', c: '', d: '' },
            b: '',
            c: '',
            d: '',
          },
          b: '',
          c: '',
          d: '',
        },
        c: {
          a: {
            a: { a: { a: '', b: '', c: '', d: '' }, b: '', c: '', d: '' },
            b: '',
            c: '',
            d: '',
          },
          b: '',
          c: '',
          d: '',
        },
        d: {
          a: {
            a: { a: { a: '', b: '', c: '', d: '' }, b: '', c: '', d: '' },
            b: '',
            c: '',
            d: '',
          },
          b: '',
          c: '',
          d: '',
        },
      },
      true,
    ],
    [
      {
        a: {
          a: {
            a: { a: { a: '', b: '', c: '', d: '' }, b: '', c: '', d: '' },
            b: '',
            c: '',
            d: '',
          },
          b: '',
          c: '',
          d: '',
        },
        b: {
          a: {
            a: { a: { a: '', b: '', c: '', d: '' }, b: '', c: '', d: '' },
            b: '',
            c: '',
            d: '',
          },
          b: '',
          c: '',
          d: '',
        },
        c: {
          a: {
            a: { a: { a: '', b: '', c: '', d: '' }, b: '', c: '', d: '' },
            b: '',
            c: '',
            d: '',
          },
          b: '',
          c: '',
          d: '',
        },
        d: {
          a: {
            a: { a: { a: '', b: '', c: '', d: '' }, b: '', c: '', d: '' },
            b: '',
            c: '',
            d: '',
          },
          b: '',
          c: '',
          d: '',
        },
      },
      {
        a: {
          a: {
            a: { a: { a: '', b: '', c: '', d: '' }, b: '', c: '', d: '' },
            b: '',
            c: '',
            d: '',
          },
          b: '',
          c: '',
          d: '',
        },
        b: {
          a: {
            a: { a: { a: '', b: '', c: '', d: '' }, b: '', c: '', d: '' },
            b: '',
            c: '',
            d: '',
          },
          b: '',
          c: '',
          d: '',
        },
        c: {
          a: {
            a: { a: { a: '', b: '', c: '', d: '' }, b: '', c: '', d: '' },
            b: '',
            c: '',
            d: '',
          },
          b: '',
          c: '',
          d: '',
        },
        d: {
          a: {
            a: { a: { a: '', b: '', c: '', d: '' }, b: '', c: '', d: '' },
            b: '',
            c: '',
            d: '',
          },
          b: '',
          c: '',
          d: '1',
        },
      },
      false,
    ],
  ])('should compare items as expected : (%s) vs (%s) ', (obj1, obj2, expected) => {
    expect(areEqual(obj1, obj2)).toBe(expected);
  });
});

describe('copy', () => {
  it.each([
    [null, null],
    [undefined, undefined],
    [1, 1],
    ['string', 'string'],
    [['array'], ['array']],
    [{ key: 'object' }, { key: 'object' }],
  ])('should copy test', (input, expected) => {
    expect(copy(input)).toStrictEqual(expected);
  });

  it('should not modify old reference', () => {
    const obj = { key: '123456789', uid: 'sd-fsd6-f54' };
    const replica = copy(obj);

    replica.key = 'key';

    expect(replica).toStrictEqual({ key: 'key', uid: 'sd-fsd6-f54' });
    expect(obj).toStrictEqual({ key: '123456789', uid: 'sd-fsd6-f54' });
  });

  it('should not modify nested reference', () => {
    const obj = { key: '123456789', content: { index: 1 } };
    const replica = copy(obj);

    replica.content.index = 'string' as unknown as number;

    expect(replica).toStrictEqual({ key: '123456789', content: { index: 'string' } });
    expect(obj).toStrictEqual({ key: '123456789', content: { index: 1 } });
  });

  it('should copy functions', () => {
    const obj = { run: () => 'done' };

    const obj2 = copy(obj);

    expect(obj2.run()).toBe(obj.run());
  });
});

describe('copyKeys', () => {
  it('should copy keys into target', () => {
    const target = {};
    const source = { text: 'test' };

    copyKeys(source, target);

    expect(target).toStrictEqual({ text: 'test' });
  });

  it('should override keys', () => {
    const target = { text: 'old' };
    const source = { text: 'test' };

    copyKeys(source, target);

    expect(target).toStrictEqual({ text: 'test' });
  });

  it('should copy all keys expect excluded', () => {
    const target = {};
    const source = { text: 'test', age: 1 };

    copyKeys(source, target, 'age');

    expect(target).toStrictEqual({ text: 'test' });
  });
});

describe('forEachKey', () => {
  it('should throw when object is invalid', () => {
    expect(() => forEachKey(() => 0, 1 as unknown as Record<string, string>)).toThrow();
  });

  it('should throw when callback is invalid', () => {
    expect(() => forEachKey(1 as unknown as () => void, {})).toThrow();
  });

  it('should run with correct values', () => {
    const callback = vitest.fn();

    const object = { one: 1, two: 2, three: 3, four: 4 };

    forEachKey(callback, object);

    expect(callback).toHaveBeenCalledTimes(4);
  });
});

describe('getType', () => {
  it('should return null', () => {
    expect(getType(null)).toBe<Type>('null');
  });

  it('should return undefined', () => {
    expect(getType(undefined)).toBe<Type>('undefined');
  });

  it('should return number', () => {
    expect(getType(1)).toBe<Type>('number');
  });

  it('should return bigint', () => {
    expect(getType(BigInt(1))).toBe<Type>('bigint');
  });

  it('should return string', () => {
    expect(getType('str')).toBe<Type>('string');
  });

  it('should return boolean', () => {
    expect(getType(true)).toBe<Type>('boolean');
    expect(getType(false)).toBe<Type>('boolean');
  });

  it('should return symbol', () => {
    expect(getType(Symbol.for('test'))).toBe<Type>('symbol');
  });

  it('should return array', () => {
    expect(getType([])).toBe<Type>('array');
  });

  it('should return object', () => {
    expect(getType({})).toBe<Type>('object');
  });
});

describe('hasProperty', () => {
  it.each([
    [null, 'prop', false],
    [undefined, 'prop', false],
    [1, 'prop', false],
    [true, 'prop', false],
    ['string', 'prop', false],
    [{ key: 'prop' }, 'prop', false],
    [{ prop: 'val' }, 'prop', true],
    [{ prop: null }, 'prop', true],
  ])('should determine if (%s) has property (%s)', (object, prop, expected) => {
    expect(hasProperty(object, prop)).toBe(expected);
  });
});

describe('isFalsy', () => {
  it.each([
    [null, true],
    [undefined, true],
    [1, false],
    ['', true],
    ['string', false],
  ])('should determine if a value is falsy (%s)', (input, expected) => {
    expect(isFalsy(input)).toBe(expected);
  });
});

describe('isFunction', () => {
  it.each([
    [null, false],
    [undefined, false],
    [1, false],
    ['string', false],
    [{}, false],
    [[], false],
    [
      function () {
        1;
      },
      true,
    ],
    [
      () => {
        1;
      },
      true,
    ],
  ])('should determine if a value is a function (%s)', (input, expected) => {
    expect(isFunction(input)).toBe(expected);
  });
});

describe('isPrimitiveType', () => {
  it.each([
    [undefined, true],
    [1, true],
    ['string', true],
    [true, true],
    [false, true],
    [[], false],
    [{}, false],
    [null, false],
  ])('should determine if object type is primitive => (%s)', (input, expected) => {
    expect(isPrimitive(input)).toBe(expected);
  });
});

describe('merge', () => {
  it.each([
    [[undefined]],
    [[null]],
    [[1]],
    [['string']],
    [[{}, undefined]],
    [[{}, null]],
    [[{}, {}, 'string']],
    [[{}, {}, 1, {}]],
  ])('should throw an error when an argument is not an object', objects => {
    expect(() => merge(...(objects as Record<string, unknown>[]))).toThrow();
  });

  it.each([
    [[{}], {}],
    [[{}, {}], {}],
    [[{}, { color: 'red' }], { color: 'red' }],
    [[{ color: 'red' }, {}], { color: 'red' }],
    [[{}, { color: 'red' }, {}], { color: 'red' }],
    [[{ color: 'red' }, { color: 'blue' }], { color: 'blue' }],
    [[{ color: 'red' }, { color: 'blue' }, { color: 'yellow' }], { color: 'yellow' }],
    [[{ color: 'red', age: 10 }, { color: 'blue' }], { color: 'blue', age: 10 }],
    [[{ data: null }, { data: {} }], { data: {} }],
    [[{ data: {} }, { data: null }], { data: null }],
    [[{ data: undefined }, { data: {} }], { data: {} }],
    [[{ data: {} }, { data: undefined }], { data: undefined }],
    [[{ data: { age: 1 } }, { data: { age: 2 } }], { data: { age: 2 } }],
    [[{ data: {} }, { data: { age: 2 } }], { data: { age: 2 } }],
    [[{ data: { age: 1 } }, { data: {} }], { data: { age: 1 } }],
    [
      [{ data: { age: 1, others: undefined } }, { data: { others: {} } }],
      { data: { age: 1, others: {} } },
    ],
    [
      [{ data: { age: 1, others: {} } }, { data: { others: undefined } }],
      { data: { age: 1, others: undefined } },
    ],
    [
      [
        [1, 2, 3],
        [3, 2, 1],
      ],
      [3, 2, 1],
    ],
    [
      [
        [1, 2],
        [3, 2, 1],
      ],
      [3, 2, 1],
    ],
    [
      [
        [{}, 2],
        [3, 2, 1],
      ],
      [3, 2, 1],
    ],
    [
      [
        [{ hello: undefined }, 2],
        [{ hello: 'world' }, 2, 1],
      ],
      [{ hello: 'world' }, 2, 1],
    ],
    [
      [{}, [1, 2]],
      [1, 2],
    ],
  ])('should merge one or more objects', (objects, expected) => {
    expect(merge(...objects)).toStrictEqual(expected);
  });
});

describe('pick', () => {
  const obj = { name: 'test', age: 99, job: 'tester' };

  it('should create a new object all keys', () => {
    expect(omit(obj)).toStrictEqual({
      name: 'test',
      age: 99,
      job: 'tester',
    });
  });

  it('should preserve obj and create a new one with selected keys', () => {
    const omitted = omit(obj, 'age');

    expect(omitted).toStrictEqual({ name: 'test', job: 'tester' });
    expect(obj).toStrictEqual({ name: 'test', age: 99, job: 'tester' });
  });
});

describe('pick', () => {
  const obj = { name: 'test', age: 99, job: 'tester' };

  it('should create a new object no keys', () => {
    expect(pick(obj)).toStrictEqual({});
  });

  it('should preserve obj and create a new one with selected keys', () => {
    const picked = pick(obj, 'job');

    expect(picked).toStrictEqual({ job: 'tester' });
    expect(obj).toStrictEqual({ name: 'test', age: 99, job: 'tester' });
  });
});
