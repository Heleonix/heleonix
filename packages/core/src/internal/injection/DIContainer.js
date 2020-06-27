import { Symbols } from '../Symbols';
import { UnknownComponentError } from '../../UnknownComponentError';
import { InjectionNotAllowedError } from '../../InjectionNotAllowedError';

function assertComponentIsProvided(components, injectingName) {
  if (!components[injectingName]) {
    throw new UnknownComponentError(injectingName);
  }
}

function assertInjectionIsAllowed(component, hostInstance, rules) {
  const canInject = rules.some(
    r =>
      (component === r.component || component.prototype instanceof r.component) &&
      r.allowedHosts &&
      r.allowedHosts.some(ah => hostInstance instanceof ah)
  );

  if (!canInject) {
    throw new InjectionNotAllowedError(component.name, hostInstance.constructor.name);
  }
}

export class DIContainer {
  #instances = new Map();

  #injector = { [Symbols.DIContainer]: this };

  #components;

  #rules;

  constructor(components, rules) {
    this.#components = { [Symbols.DIContainer]: this, ...components };

    this.#rules = rules.map(r => ({ ...r, allowedHosts: [...r.allowedHosts] }));
  }

  getInstanceForInjection(injectingName, hostInstance) {
    if (!this.#instances.has(injectingName)) {
      assertComponentIsProvided(this.#components, injectingName);

      const Component = this.#components[injectingName];

      const instance = new Component(this.#injector);

      this.#instances.set(injectingName, instance);
    }

    const instance = this.#instances.get(injectingName);

    assertInjectionIsAllowed(instance.constructor, hostInstance, this.#rules);

    return instance;
  }

  createInstanceFor(injectingName, hostInstance) {
    assertComponentIsProvided(this.#components, injectingName);

    const Component = this.#components[injectingName];

    assertInjectionIsAllowed(Component, hostInstance, this.#rules);

    const instance = new Component(this.#injector);

    return instance;
  }
}
