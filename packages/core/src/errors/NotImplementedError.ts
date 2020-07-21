import { HeleonixError } from "./HeleonixError";

export class NotImplementedError extends HeleonixError {
    constructor(public readonly methodName: string) {
        super('The following method must be implemented: "{0}".', methodName);
    }
}
