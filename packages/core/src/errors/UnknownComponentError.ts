import { HeleonixError } from "./HeleonixError";

export class UnknownComponentError extends HeleonixError {
    constructor(public readonly componentName: string) {
        super('The "{0}" component was not provided.', componentName);
    }
}
