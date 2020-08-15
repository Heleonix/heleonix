import { Control } from "./Control";
import { Symbols } from "../Symbols";
import { ControlBuildingError } from "../errors/ControlBuildingError";
import { UsageType } from "../../types/UsageType";

export class Children extends Control {
    public [Symbols.Control_build](element: HTMLElement): void {
        try {
            let parent = this[Symbols.Control_parent];

            while (parent && parent[Symbols.Control_usageType] !== UsageType.item) {
                parent = parent[Symbols.Control_parent];
            }

            if (parent) {
                parent = parent[Symbols.Control_parent];
            }

            if (!parent) {
                return;
            }

            for (const child of parent[Symbols.Control_usage].children || []) {
                const control = this.ControlEngine.buildChild(child, parent, element);

                if (control) {
                    this[Symbols.Control_items].attach(control);
                }
            }
        } catch (e) {
            this[Symbols.ErrorHandler][Symbols.ErrorHandler_handle](e);

            throw new ControlBuildingError(this[Symbols.Control_definition].control);
        }
    }

    public [Symbols.ErrorHandler_handle](sender: Control, event: EventType, args: EventArgs): void {}
}
