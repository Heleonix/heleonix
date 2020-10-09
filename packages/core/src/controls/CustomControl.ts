import { Symbols } from "../Symbols";
import { Control } from "./Control";
import { EventArgs } from "../EventArgs";
import { IControlDefinition } from "./IControlDefinition";
import { IControlUsage } from "./IControlUsage";
import { ControlBuildingError } from "../errors/ControlBuildingError";

export abstract class CustomControl extends Control {
    public [Symbols.Control_build](element: Element): void {
        try {
            this.build(element);
        } catch (e) {
            this[Symbols.ErrorHandler][Symbols.ErrorHandler_handle](e);

            throw new ControlBuildingError(this[Symbols.Control_definition].tag);
        }
    }

    public [Symbols.Control_handleChange](binding: string, value: unknown): void {
        try {
            this.handleUpdate(binding, value);
        } catch (e) {
            this[Symbols.ErrorHandler][Symbols.ErrorHandler_handle](e);
        }
    }

    public [Symbols.Control_destroy](): void {
        try {
            this.destroy();
        } catch (e) {
            this[Symbols.ErrorHandler][Symbols.ErrorHandler_handle](e);
        }
    }

    protected get definition(): IControlDefinition {
        return this[Symbols.Control_definition];
    }

    protected get usage(): IControlUsage {
        return this[Symbols.Control_usage];
    }

    protected abstract build(node: Element): void;

    protected abstract handleUpdate(binding: string, value: unknown): void;

    protected abstract destroy(): void;
}
