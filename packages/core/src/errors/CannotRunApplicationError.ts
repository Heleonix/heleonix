import { HeleonixError } from "./HeleonixError";

export class CannotRunApplicationError extends HeleonixError {
    public constructor(public readonly reason: Error) {
        super("The application failed to run because of: {0}", reason.message);
    }
}
