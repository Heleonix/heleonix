import { HeleonixError } from "./HeleonixError";

export class ControlBuildingError extends HeleonixError {
    public constructor(public readonly path: string) {
        super('Could not build a control by path: "{0}".', path);
    }
}
