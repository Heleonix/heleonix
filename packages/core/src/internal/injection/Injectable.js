import { Symbols } from '../Symbols';
import { InvalidInjectableError } from '../../errors/InvalidInjectableError';

function assertIsInjectable(componentName, injector) {
  if (!injector?.[Symbols.DIContainer]) {
    throw new InvalidInjectableError(componentName);
  }
}

export class Injectable {
  constructor(injector) {
    assertIsInjectable(this.constructor.name, injector);

    this[Symbols.DIContainer] = injector[Symbols.DIContainer];
  }

  [Symbols.DIContainer];
}
