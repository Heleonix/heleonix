import { Symbols } from "../Symbols";
import { Control } from "./Control";

export abstract class CustomControl extends Control {
    public [Symbols.Control_build](node: Element): void {
        try {
            this.build(node);
        } catch (e) {
            this[Symbols.ErrorHandler][Symbols.ErrorHandler_handle](e);
        }
    }

    public [Symbols.Control_clean](): void {
        try {
            this.clean();
        } catch (e) {
            this[Symbols.ErrorHandler][Symbols.ErrorHandler_handle](e);
        }
    }

    protected abstract build(node: Element): void;

    protected abstract clean(): void;
}
