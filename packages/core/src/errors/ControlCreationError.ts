import { HeleonixError } from "./HeleonixError";

export class ControlCreationError extends HeleonixError {
    public constructor(public readonly controlName: string) {
        super('Could not create a control "{0}".', controlName);
    }
}
