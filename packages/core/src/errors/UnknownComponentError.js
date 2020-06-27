import { HeleonixError } from './HeleonixError';

export class UnknownComponentError extends HeleonixError {
  constructor(componentName) {
    super('The "{0}" component was not provided.', componentName);

    this.componentName = componentName;
  }
}
