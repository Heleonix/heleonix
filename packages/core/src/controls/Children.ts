import { Control } from "./Control";
import { Symbols } from "../Symbols";
import { ControlBuildingError } from "../errors/ControlBuildingError";
import { UsageType } from "./UsageType";
import { ControlEvent } from "./UpdateType";
import { EventArgs } from "../EventArgs";

export class Children extends Control {
    public [Symbols.Control_build](element: HTMLElement): void {
        try {
            if (!this.scopedParent) {
                return;
                // TODO: Throw an error because the <Children/> is used against the root control,
                // which is the only one without scopedParent.
            }

            for (const child of this.scopedParent[Symbols.Control_usage].children || []) {
                this.ControlEngine.buildChild(child, this.scopedParent, element);
            }
        } catch (e) {
            this[Symbols.ErrorHandler][Symbols.ErrorHandler_handle](e);

            throw new ControlBuildingError(this[Symbols.Control_definition].tag);
        }
    }

    public [Symbols.Control_destroy](): void {}

    public [Symbols.Control_handleChange](source: string, value: unknown): void {}

    //public [Symbols.Control_handleEvent](event: string, args: EventArgs): void {}
}
