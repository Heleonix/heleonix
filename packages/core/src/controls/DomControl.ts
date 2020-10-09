import { Control } from "./Control";
import { Symbols } from "../Symbols";
import { ControlBuildingError } from "../errors/ControlBuildingError";
import { ControlEvent } from "./UpdateType";
import { EventArgs } from "../EventArgs";

export class DomControl extends Control {
    public [Symbols.Control_build](element: HTMLElement): void {
        try {
            const newElement = element.ownerDocument.createElement(this[Symbols.Control_definition].tag);

            newElement.setAttribute("name", this.fullName);

            element.appendChild(newElement);

            for (const child of this[Symbols.Control_usage].children || []) {
                this.ControlEngine.buildChild(child, this, newElement);
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
