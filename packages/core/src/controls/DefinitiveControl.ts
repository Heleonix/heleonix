import { Control } from "./Control";
import { Symbols } from "../Symbols";
import { ControlBuildingError } from "../errors/ControlBuildingError";
import { EventArgs } from "../EventArgs";

export class DefinitiveControl extends Control {
    public [Symbols.Control_build](element: HTMLElement): void {
        try {
            for (const item of this[Symbols.Control_definition].items || []) {
                this.ControlEngine.buildItem(item, this, element);
            }
        } catch (e) {
            this[Symbols.ErrorHandler][Symbols.ErrorHandler_handle](e);

            throw new ControlBuildingError(this.fullName);
        }
    }

    public [Symbols.Control_destroy](): void {}

    public [Symbols.Control_handleUpdate](source: string, value: unknown): void {

    }

    //public [Symbols.Control_handleEvent](event: string, args: EventArgs): void {}
}
