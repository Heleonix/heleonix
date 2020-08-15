import { HeleonixError } from "./HeleonixError";

export class NoRootElementError extends HeleonixError {
    public constructor() {
        super("The root element of the application was not found in the DOM.");
    }
}
