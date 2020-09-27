import { SystemEvent } from "./SystemEvent";
import { Observable } from "./Observable";
import { EventArgs } from "./EventArgs";

export interface IObserver {
    observe(sender: Observable, event: SystemEvent, args: EventArgs): void;
}
