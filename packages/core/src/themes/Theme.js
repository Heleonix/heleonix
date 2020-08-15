import { Resource } from '../resources/Resource';
import { Hidden } from '../internal/Hidden';
import { Kind } from '../internal/Kind';

export class Theme extends Resource {
  static get [Hidden.kind]() {
    return Kind.theme;
  }

  #items = null;

  [Hidden.parse](definition) {
    this.#items = definition.items;

    this.#items[Hidden.changed] = this[Hidden.changed];

    Object.freeze(this.#items);
  }

  get [Hidden.injection]() {
    return this.#items;
  }
}
