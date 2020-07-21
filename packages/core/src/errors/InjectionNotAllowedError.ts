import { HeleonixError } from "./HeleonixError";

export class InjectionNotAllowedError extends HeleonixError {
    constructor(public readonly componentName: string, public readonly hostName: string) {
        super('The component "{0}" is not allowed to be injected into the "{1}".', componentName, hostName);
    }
}
