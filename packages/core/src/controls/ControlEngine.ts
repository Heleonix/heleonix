import { Component } from "../Component";
import { inject } from "../injection/inject";
import { automatic } from "../injection/automatic";
import { ControlManager } from "./ControlManager";
import { Symbols } from "../Symbols";
import { IControlUsage } from "../../types/IControlUsage";
import { Control } from "./Control";
import { UsageType } from "../../types/UsageType";

export class ControlEngine extends Component {
    @inject public readonly [Symbols.ControlManager] = automatic<ControlManager>();

    public buildItem(usage: IControlUsage, parent: Control | null, element: HTMLElement): Control | null {
        try {
            const control = this[Symbols.ControlManager].createControl(usage);

            if (parent) {
                parent[Symbols.Control_items].add(control);
            }

            control[Symbols.Control_usageType] = UsageType.item;

            control[Symbols.Control_build](element);

            return control;
        } catch (e) {
            this[Symbols.ErrorHandler][Symbols.ErrorHandler_handle](e);

            return null;
        }
    }

    public buildChild(usage: IControlUsage, parent: Control, element: HTMLElement): Control | null {
        try {
            const control = this[Symbols.ControlManager].createControl(usage);

            if (parent) {
                parent[Symbols.Control_children].add(control);
            }

            control[Symbols.Control_usageType] = UsageType.child;

            control[Symbols.Control_build](element);

            return control;
        } catch (e) {
            this[Symbols.ErrorHandler][Symbols.ErrorHandler_handle](e);

            return null;
        }
    }
}
