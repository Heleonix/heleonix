import { SYMBOLS } from './internal/Symbols';
import { ERROR_MESSAGES, error } from './internal/Errors';

export class Component {
  constructor(injector) {
    if (!injector?.[SYMBOLS.app]) {
      throw error(ERROR_MESSAGES.valueNotProvided, 'app');
    }

    this[SYMBOLS.app] = injector[SYMBOLS.app];
  }

  static get [SYMBOLS.kind]() {
    throw error(ERROR_MESSAGES.notImplemented);
  }

  [SYMBOLS.app];
}
