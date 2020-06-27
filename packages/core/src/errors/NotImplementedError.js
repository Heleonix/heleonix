import { HeleonixError } from './HeleonixError';

export class NotImplementedError extends HeleonixError {
  constructor(methodName) {
    super('The following method must be implemented: "{0}".', methodName);

    this.methodName = methodName;
  }
}
