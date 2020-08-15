import { Component } from "../Component";
import { IControlUsage } from "../../types/IControlUsage";
import { ControlEngine } from "./ControlEngine";
import { automatic } from "../injection/automatic";
import { inject } from "../injection/inject";
import { Symbols } from "../Symbols";
import { EventType } from "packages/core/types/EventType";
import { EventArgs } from "../EventArgs";
import { IControlDefinition } from "../../types/IControlDefinition";
import { ControlCollection } from "./ControlCollection";
import { UsageType } from "../../types/UsageType";

export abstract class Control extends Component {
    @inject protected readonly ControlEngine = automatic<ControlEngine>();

    public readonly [Symbols.Control_items]: ControlCollection = new ControlCollection(this);

    public readonly [Symbols.Control_children]: ControlCollection = new ControlCollection(this);

    public [Symbols.Control_definition]: IControlDefinition;

    public [Symbols.Control_usage]: IControlUsage;

    public [Symbols.Control_parent]: Control | null = null;

    public [Symbols.Control_usageType]: UsageType = UsageType.item;

    public [Symbols.Control_setup](definition: IControlDefinition, usage: IControlUsage): void {
        this[Symbols.Control_definition] = definition;
        this[Symbols.Control_usage] = usage;
    }

    public [Symbols.Control_clean](): void {}

    public abstract [Symbols.ErrorHandler_handle](sender: Control, event: EventType, args: EventArgs): void;

    public abstract [Symbols.Control_build](element: HTMLElement): void;
}
