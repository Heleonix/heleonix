import { HeleonixError } from "./HeleonixError";

export class NoRootElementError extends HeleonixError {
    public constructor(public readonly selector: string) {
        super('The root element of the application was not found in the DOM by the selector: "{0}".', selector);
    }
}
