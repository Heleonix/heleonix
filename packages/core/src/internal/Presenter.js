import { Hidden } from './symbols';
import { ViewModel } from './../view-models/ViewModel';
import { DomElement } from './DomElement';

export class Presenter {
  #application;

  #children;

  #childrenViewModel;

  #parentViewModel;

  #bindViewModels(source, target, props) {
    if (!props) {
      // TODO: implement
    }
  }

  constructor(application) {
    this.#application = application;
  }

  buildChildren(parentElement) {
    if (!this.children) {
      return;
    }

    const prevParentViewModel = this.#parentViewModel;

    this.#parentViewModel = this.#childrenViewModel;

    for (let i = 0; i < this.#children.length; i += 1) {
      this[Hidden.build](this.#children[i], parentElement);
    }

    this.#parentViewModel = prevParentViewModel;
  }

  [Hidden.build](usage, parentElement) {
    validateViewUsage(usage);

    const view = this.#application[Hidden.getView](usage.view);
    const viewModel = this.#application[Hidden.createViewModel](usage.view);

    if (viewModel && this.#parentViewModel) {
      this.#bindViewModels(this.#parentViewModel, viewModel, usage.props);
    }

    const prevChildren = this.#children;
    const prevChildrenViewModel = this.#childrenViewModel;
    const prevParentViewModel = this.#parentViewModel;

    if (usage.items && !(view instanceof DomElement)) {
      this.#children = usage.items;
      this.#childrenViewModel = this.#parentViewModel;
    }

    this.#parentViewModel = viewModel || this.#parentViewModel;

    view.build(usage, this.#parentViewModel, this, parentElement);

    this.#children = prevChildren;
    this.#childrenViewModel = prevChildrenViewModel;
    this.#parentViewModel = prevParentViewModel;
  }

  bindContent(element, viewModel, content) {
    // TODO: bind content <div>{binding}</div>
  }

  bindProps(element, ViewModel, props) {
    if (!props) {
      return;
    }

    // TODO: foreach prop; bind element to viewModel
  }
}
