import { Control } from "./Control";
import { Symbols } from "../Symbols";
import { ControlBuildingError } from "../errors/ControlBuildingError";

export class UIControl extends Control {
    public [Symbols.Control_build](element: HTMLElement): void {
        try {
            for (const item of this[Symbols.Control_definition].items) {
                this.ControlEngine.buildItem(item, this, element);
            }
        } catch (e) {
            this[Symbols.ErrorHandler][Symbols.ErrorHandler_handle](e);

            throw new ControlBuildingError(this[Symbols.Control_definition].control);
        }
    }

    public [Symbols.ErrorHandler_handle](sender: Control, event: EventType, args: EventArgs): void {}
}
