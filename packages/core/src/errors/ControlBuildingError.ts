import { HeleonixError } from "./HeleonixError";

export class ControlBuildingError extends HeleonixError {
    public constructor(public readonly controlName: string) {
        super('Could not build a control "{0}".', controlName);
    }
}
