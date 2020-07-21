import { Hidden } from '../Hidden';
import { validateDecoratorUsage, validateIsPrimitive, validateCanBeObservable } from '../rules';
import { notification } from '../notification';
import { isPrimitive } from './isPrimitive';
import { setMemberKind } from './setMemberKind';

function makeObjectObservable(object) {
  const obj = object;

  /* eslint-disable no-restricted-syntax */
  /* eslint-disable guard-for-in */
  for (const key in obj) {
    validateCanBeObservable(obj[key]);

    if (isPrimitive(obj[key])) {
      if (!Object.prototype.hasOwnProperty.call(obj, Hidden.changed)) {
        const definition = notification({});

        definition.descriptor.initializer = definition.initializer;

        Object.defineProperty(obj, Hidden.changed, definition.descriptor);
      }

      if (obj[Hidden.bag] === undefined) {
        obj[Hidden.bag] = {};
      }

      obj[Hidden.bag][key] = obj[key];

      Object.defineProperty(obj, key, {
        get: function get() {
          return this[Hidden.bag][key];
        },
        set: function set(value) {
          validateIsPrimitive(value);

          if (this[Hidden.bag][key] !== value) {
            this[Hidden.bag][key] = value;

            this[Hidden.changed](key);
          }
        },
      });
    } else if (Array.isArray(obj[key])) {
      // TODO: implement Array observing.
    } else {
      makeObjectObservable(obj[key]);
    }
  }
  /* eslint-enable no-restricted-syntax */
  /* eslint-enable guard-for-in */

  Object.freeze(obj);
}

export function makeObservable(definition, kind) {
  const def = definition;
  const { key } = def;
  const initialValue = def.initializer();

  validateCanBeObservable(initialValue);

  if (isPrimitive(initialValue)) {
    def.descriptor = {};
    def.placement = 'prototype';
    def.kind = 'method';
    def.initializer = undefined;

    def.descriptor.get = function get() {
      if (!Object.prototype.hasOwnProperty.call(this[Hidden.bag], key)) {
        validateDecoratorUsage(this, kind);

        setMemberKind(this, key, kind);

        this[Hidden.bag][key] = initialValue;
      }

      return this[Hidden.bag][key];
    };

    def.descriptor.set = function set(value) {
      if (!Object.prototype.hasOwnProperty.call(this[Hidden.bag], key)) {
        validateDecoratorUsage(this, kind);

        setMemberKind(this, key, kind);
      }

      validateIsPrimitive(value);

      if (this[Hidden.bag][key] !== value) {
        this[Hidden.bag][key] = value;

        this[Hidden.changed](key);
      }
    };
  } else if (Array.isArray(initialValue)) {
    // TODO: implement Array observing.
  } else {
    makeObjectObservable(initialValue);

    def.descriptor = {};

    def.initializer = function initializer() {
      validateDecoratorUsage(this, kind);

      setMemberKind(this, key, kind);

      return initialValue;
    };
  }

  return def;
}
