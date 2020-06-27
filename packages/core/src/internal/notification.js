import { SYMBOLS } from './Symbols';

function add(handler) {
  this[SYMBOLS.bag].push(handler);
}

function remove(handler) {
  const index = this[SYMBOLS.bag].indexOf(handler);

  this[SYMBOLS.bag].splice(index, 1);
}

export function notification(definition) {
  const def = definition;

  def.descriptor = {};

  def.initializer = function initializer() {
    const notificationImpl = function notificationImpl(...args) {
      for (let i = 0; i < notificationImpl[SYMBOLS.bag].length; i += 1) {
        notificationImpl[SYMBOLS.bag][i](...args);
      }
    };

    notificationImpl[SYMBOLS.bag] = [];
    notificationImpl.add = add;
    notificationImpl.remove = remove;

    return notificationImpl;
  };

  return def;
}
