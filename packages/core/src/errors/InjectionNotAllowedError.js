import { HeleonixError } from './HeleonixError';

export class InjectionNotAllowedError extends HeleonixError {
  constructor(componentName, hostName) {
    super('The component "{0}" is not allowed to be injected into the "{1}".', componentName, hostName);

    this.componentName = componentName;
    this.hostName = hostName;
  }
}
