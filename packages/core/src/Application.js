import { isDomElementName } from './internal/helpers/isDomElementName';
import { DomElement } from './internal/DomElement';
import { Children } from './internal/Children';
import { ErrorHandler } from './internal/ErrorHandler';

export class Application {
  static get root() {
    return 'html';
  }

  static get errorHandler() {
    return ErrorHandler;
  }

  [Hidden.getView](name) {
    if (isDomElementName(name)) {
      return this[Hidden.getComponent](DomElement.name);
    }

    return this[Hidden.getComponent](name);
  }

  [Hidden.getStyle](name) {
    return this[Hidden.getComponent](`${name}Style`);
  }

  [Hidden.createViewModel](name) {
    if (isDomElementName(name)) {
      return null;
    }

    const viewModelName = `${name}ViewModel`;

    validateComponentRegistered(this.#componentsCache[viewModelName], viewModelName);

    return this.#createInstance(viewModelName);
  }

  run() {
    validateCanRunApplication(Application.components, Application.root, Application.entry);

    this.#componentsCache = { ...Application.components, DomElement, Children };

    const rootElement = document.querySelector(Application.root);

    validateValueProvided(rootElement, 'root');

    this.#presenter[Hidden.build]({ view: Application.entry }, rootElement);
  }
}
