import { Component } from "./Component";
import { Symbols } from "./Symbols";
import { IObserver } from "./IObserver";
import { SystemEvent } from "./SystemEvent";
import { EventArgs } from "./EventArgs";

export class Observable extends Component {
    private readonly [Symbols.Obserable_observers]: IObserver[] = [];

    public [Symbols.Observable_subscribe](observer: IObserver): void {
        if (observer && observer.observe) {
            this[Symbols.Obserable_observers].push(observer);
        }
    }

    public [Symbols.Observable_unsubscribe](observer: IObserver): void {
        const index = this[Symbols.Obserable_observers].indexOf(observer);

        if (index !== -1) {
            this[Symbols.Obserable_observers].splice(index, 1);
        }
    }

    protected [Symbols.Observable_notify](event: SystemEvent, args: EventArgs): void {
        for (const observer of this[Symbols.Obserable_observers]) {
            try {
                observer.observe(this, event, args);
            } catch (e) {
                this[Symbols.ErrorHandler][Symbols.ErrorHandler_handle](e);
            }
        }
    }
}
