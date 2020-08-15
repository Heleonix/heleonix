import { HeleonixError } from "./HeleonixError";

export class InvalidInjectableError extends HeleonixError {
    public constructor(public readonly componentName: string) {
        super('The "{0}" must inherit one of Heleonix classes.', componentName);
    }
}
