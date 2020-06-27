import { DefinitionGettingError } from '../errors/DefinitionGettingError';
import { NotImplementedError } from '../errors/NotImplementedError';
import { Symbols } from '../internal/Symbols';
import { HeleonixComponent } from '../internal/HeleonixComponent';

export class ViewDefinitionProvider extends HeleonixComponent {
  [Symbols.getDefinition](name) {
    try {
      return this.getDefinition(name);
    } catch (e) {
      this[Symbols.ErrorHandler][Symbols.handle](e);

      throw new DefinitionGettingError(name);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getDefinition() {
    throw new NotImplementedError('getDefinition');
  }
}
