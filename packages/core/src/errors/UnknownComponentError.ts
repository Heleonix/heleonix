import { HeleonixError } from "./HeleonixError";

export class UnknownComponentError extends HeleonixError {
    public constructor(public readonly componentName: string) {
        super('The "{0}" component is unknown (probably it was not provided).', componentName);
    }
}
