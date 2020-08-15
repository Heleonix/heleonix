import { HeleonixError } from "./HeleonixError";

export class DefinitionGettingError extends HeleonixError {
    public constructor(public readonly componentName: string) {
        super('Could not load a definition for "{0}".', componentName);
    }
}
