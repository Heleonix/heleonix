import { View } from './View';
import { Hidden } from './Hidden';

export class DomElement extends View {
  // eslint-disable-next-line class-methods-use-this
  build(usage, viewModel, presenter, parentElement) {
    const element = null;

    // TODO:
    // - create dom element

    presenter.bindProps(element, viewModel, usage.props);

    if (!usage.items) {
      return;
    }

    if (typeof usage.items === 'string') {
      presenter.bindContent(element, viewModel, usage.items);
    }

    // - append dom element to parentElement

    if (!Array.isArray(usage.items)) {
      // TODO: implement validation.
      throw error();
    }

    for (let i = 0; i < usage.items.length; i += 1) {
      presenter.build(usage.items[i], viewModel, element);
    }
  }
}
