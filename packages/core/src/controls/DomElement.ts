import { Control } from "./Control";
import { Symbols } from "../Symbols";
import { ControlBuildingError } from "../errors/ControlBuildingError";

export class DomElement extends Control {
    public [Symbols.Control_build](element: HTMLElement): void {
        try {
            for (const child of this[Symbols.Control_usage].children || []) {
                const control = this.ControlEngine.buildChild(child, this, element);

                if (control) {
                    this[Symbols.Control_children].attach(control);
                }
            }
        } catch (e) {
            this[Symbols.ErrorHandler][Symbols.ErrorHandler_handle](e);

            throw new ControlBuildingError(this[Symbols.Control_definition].control);
        }
    }

    public [Symbols.ErrorHandler_handle](sender: Control, event: EventType, args: EventArgs): void { }
}
