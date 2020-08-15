import { Observable } from "../Observable";
import { IContext } from "../../types/IContext";
import { EventType } from "packages/core/types/EventType";
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

        this[Symbols.Observable_notify](EventType.ContextChanged, EventArgs.Empty);
    }
}
