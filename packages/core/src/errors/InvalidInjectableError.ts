import { HeleonixError } from "./HeleonixError";

export class InvalidInjectableError extends HeleonixError {
    constructor(componentName: string) {
        super('The "{0}" must inherit one of Heleonix classes and have the default constructor.', componentName);

        this.componentName = componentName;
    }

    public readonly componentName: string;
}
