import { Resource } from './Resource';
import { SYMBOLS } from '../internal/Symbols';

export class Dictionary extends Resource {
  #dictionary = null;

  get map() {
    return this.#dictionary;
  }

  apply(resource) {
    super.apply(resource);

    this.#dictionary = resource;
  }

  static get [SYMBOLS.kind]() {
    return 'Dictionary';
  }
}
