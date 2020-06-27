import { Symbols } from './Symbols';
import { DefinitionGettingError } from '../errors/DefinitionGettingError';
import { NotImplementedError } from '../errors/NotImplementedError';
import { DefinitionProvider } from './DefinitionProvider';

export class ContextualDefinitionProvider extends DefinitionProvider {
  [Symbols.getDefinition](name, context) {
    try {
      return this.getDefinition(name, context);
    } catch (e) {
      this[Symbols.ErrorHandler][Symbols.handle](e);

      throw new DefinitionGettingError(name);
    }
  }

  /* eslint-disable no-unused-vars */
  /* eslint-disable class-methods-use-this */
  getDefinition(name, context) {
    throw new NotImplementedError('getDefinition');
  }
  /* eslint-enable class-methods-use-this */
  /* eslint-enable no-unused-vars */
}
