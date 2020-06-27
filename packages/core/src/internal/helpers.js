import { SYMBOLS } from './Symbols';
import { error, ERROR_MESSAGES } from './Errors';
import { validateDecoratorUsage } from './Rules';
import { notification } from './notification';

function isPrimitive(value) {
  return (typeof value !== 'object' && typeof value !== 'function') || value === null;
}

function makeObjectObservable(object) {
  const obj = object;

  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    if (isPrimitive(obj[key])) {
      if (!Object.prototype.hasOwnProperty.call(obj, SYMBOLS.changed)) {
        const definition = notification({});

        definition.descriptor.initializer = definition.initializer;

        Object.defineProperty(obj, SYMBOLS.changed, definition.descriptor);
      }

      if (obj[SYMBOLS.bag] === undefined) {
        obj[SYMBOLS.bag] = {};
      }

      obj[SYMBOLS.bag][key] = obj[key];

      Object.defineProperty(obj, key, {
        get: function get() {
          return this[SYMBOLS.bag][key];
        },
        set: function set(value) {
          if (!isPrimitive(value)) {
            throw error(ERROR_MESSAGES.onlyPrimitiveCanBeSet);
          }

          this[SYMBOLS.bag][key] = value;

          this[SYMBOLS.changed](key);
        }
      });
    } else if (Array.isArray(obj[key])) {
      throw error(ERROR_MESSAGES.typeNotSupported, 'array');
    } else {
      makeObjectObservable(obj[key]);
    }
  }

  Object.freeze(obj);
}

export function makeObservable(definition, decoratorName) {
  const def = definition;
  const { key } = def;
  const initialValue = def.initializer();

  if (isPrimitive(initialValue)) {
    def.descriptor = {};
    def.placement = 'prototype';
    def.kind = 'method';
    def.initializer = undefined;

    def.descriptor.get = function get() {
      if (!Object.prototype.hasOwnProperty.call(this[SYMBOLS.bag], key)) {
        validateDecoratorUsage(this, decoratorName);

        this[SYMBOLS.bag][key] = initialValue;
      }

      return this[SYMBOLS.bag][key];
    };

    def.descriptor.set = function set(value) {
      if (!Object.prototype.hasOwnProperty.call(this[SYMBOLS.bag], key)) {
        validateDecoratorUsage(this, decoratorName);
      }

      if (!isPrimitive(value)) {
        throw error(ERROR_MESSAGES.onlyPrimitiveCanBeSet);
      }

      this[SYMBOLS.bag][key] = value;

      this[SYMBOLS.changed](key);
    };
  } else if (Array.isArray(initialValue)) {
    throw error(ERROR_MESSAGES.typeNotSupported, 'array');
  } else {
    makeObjectObservable(initialValue);

    def.descriptor = {};

    def.initializer = function initializer() {
      validateDecoratorUsage(this, decoratorName);

      return initialValue;
    };
  }

  return def;
}
