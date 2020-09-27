import { Observable } from "../Observable";
import { IContext } from "./IContext";
import { SystemEvent } from "packages/core/src/SystemEvent";
import { Symbols } from "../Symbols";
import { EventArgs } from "../EventArgs";

export class ContextManager extends Observable {
    private context: IContext = {};

    public get current(): IContext {
        return { ...this.context };
    }

    public change(diff: IContext): void {
        const previousContext = this.current;

        this.context = { ...previousContext, ...diff };

        this[Symbols.Observable_notify](SystemEvent.ContextChanged, EventArgs.Empty);
    }
}
