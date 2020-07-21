import { View } from './View';
import { validateViewUsage } from './rules';

export class Children extends View {
  // eslint-disable-next-line class-methods-use-this
  build(usage, viewModel, presenter, parentElement) {
    validateViewUsage(presenter.children);

    presenter.buildChildren(parentElement);
  }
}
