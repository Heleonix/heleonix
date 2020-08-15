import { EventType } from "./EventType";
import { Observable } from "./../src/Observable";
import { EventArgs } from "../src/EventArgs";

export interface IObserver {
    observe(sender: Observable, event: EventType, args: EventArgs): void;
}
