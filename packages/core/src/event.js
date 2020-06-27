import { SYMBOLS } from './internal/Symbols';
import { ERROR_MESSAGES, error } from './internal/Errors';
import { validateDecoratorUsage, validateEmptyFieldDecoration } from './internal/Rules';

function add(handler) {
  if (handler[SYMBOLS.isHandler] !== true) {
    throw error(ERROR_MESSAGES.handler);
  }

  this[SYMBOLS.bag].push(handler);
}

function remove(handler) {
  const index = this[SYMBOLS.bag].indexOf(handler);

  if (index !== -1) {
    this[SYMBOLS.bag].splice(index, 1);
  }
}

export function event(definition) {
  validateEmptyFieldDecoration(definition);

  const def = definition;

  def.descriptor = {};

  def.initializer = function initializer() {
    validateDecoratorUsage(this, 'event');

    const eventImpl = function eventImpl(...args) {
      for (let i = 0; i < eventImpl[SYMBOLS.bag].length; i += 1) {
        eventImpl[SYMBOLS.bag][i](...args);
      }
    };

    eventImpl[SYMBOLS.bag] = [];
    eventImpl.add = add;
    eventImpl.remove = remove;

    Object.freeze(eventImpl);

    return eventImpl;
  };

  return def;
}
