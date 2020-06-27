import { HeleonixError } from './HeleonixError';

export class DefinitionGettingError extends HeleonixError {
  constructor(componentName) {
    super('Could not load a definition for "{0}".', componentName);

    this.componentName = componentName;
  }
}
