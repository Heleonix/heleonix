import { ApplicationLifecycleStage } from "./ApplicationLifecycleStage";
import { HeleonixError } from "./HeleonixError";

export class ApplicationLifecycleError extends HeleonixError {
    public constructor(public readonly stage: ApplicationLifecycleStage, public readonly reason: Error) {
        super('The application failed to process stage "{0}" due to the following error: {1}', stage, reason.message);
    }
}
