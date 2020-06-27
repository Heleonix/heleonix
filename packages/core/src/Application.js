import { SYMBOLS } from './internal/Symbols';
import { ERROR_MESSAGES, error } from './internal/Errors';

export class Application {
  #instances = new Map();

  #injector = { [SYMBOLS.app]: this };

  #componentsCache;

  [SYMBOLS.getComponent](key) {
    return this.#componentsCache[key];
  }

  [SYMBOLS.getInstance](key) {
    if (!this.#componentsCache[key]) {
      throw error(ERROR_MESSAGES.componentNotRegistered);
    }

    if (!this.#instances.has(key)) {
      this.#instances.set(key, new this.#componentsCache[key](this.#injector));
    }

    return this.#instances.get(key);
  }

  static get components() {
    throw error(ERROR_MESSAGES.notImplemented);
  }

  static get root() {
    throw error(ERROR_MESSAGES.notImplemented);
  }

  run() {
    this.#componentsCache = this.components;

    if (!this.#componentsCache) {
      throw error(ERROR_MESSAGES.valueNotProvided, 'components');
    }

    if (!this.root) {
      throw error(ERROR_MESSAGES.valueNotProvided, 'root');
    }
  }
}
