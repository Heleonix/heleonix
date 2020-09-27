import { HeleonixError } from "./HeleonixError";

export class DictionaryCreationError extends HeleonixError {
    public constructor(public readonly name: string) {
        super('Could not create a dictionary "{0}".', name);
    }
}
