import { HeleonixError } from "./HeleonixError";

export class ControlCreationError extends HeleonixError {
    public constructor(public readonly tag: string) {
        super('Could not create a control "{0}".', tag);
    }
}
