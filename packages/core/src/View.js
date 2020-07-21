import { Resource } from '../resources/Resource';
import { Hidden } from '../internal/Hidden';
import { validateViewDefinition, validateViewUsage } from '../internal/rules';
import { Kind } from '../internal/Kind';

export class View extends Resource {
  static get [Hidden.kind]() {
    return Kind.view;
  }

  #items = null;

  [Hidden.parse](definition) {
    validateViewDefinition(definition);

    this.#items = definition.items;
  }

  build(usage, viewModel, presenter, parentElement) {
    if (!this.#items) {
      return;
    }

    for (let i = 0; i < this.#items.length; i += 1) {
      presenter.build(this.#items[i], parentElement);
    }
  }
}
