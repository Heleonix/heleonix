import { SYMBOLS } from './internal/Symbols';
import { ERROR_MESSAGES } from './internal/Errors';

export class Component {
  constructor(data) {
    this[SYMBOLS.app] = data[SYMBOLS.app];
  }

  static get [SYMBOLS.kind]() {
    throw new Error(ERROR_MESSAGES.notImplemented);
  }

  [SYMBOLS.app];
}
