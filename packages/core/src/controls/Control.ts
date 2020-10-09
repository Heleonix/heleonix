import { Component } from "../Component";
import { IControlUsage } from "./IControlUsage";
import { ControlEngine } from "./ControlEngine";
import { automatic } from "../injection/automatic";
import { inject } from "../injection/inject";
import { Symbols } from "../Symbols";
import { EventArgs } from "../EventArgs";
import { IControlDefinition } from "./IControlDefinition";
import { ControlCollection } from "./ControlCollection";
import { UsageType } from "./UsageType";
import { ControlEvent } from "./UpdateType";

const handleStore = Symbol("handleStore");
const store = Symbol("store");
const fullNameKey = Symbol("fullName");
const scopedParentKey = Symbol("scopedParent");
const itemsKey = Symbol("itemsKey");
const childrenKey = Symbol("childrenKey");
const usageTypeKey = Symbol("usageTypeKey");

export abstract class Control extends Component {
    @inject protected readonly ControlEngine = automatic<ControlEngine>();

    public get items(): ControlCollection {
        return this[itemsKey];
    }

    public get children(): ControlCollection {
        return this[childrenKey];
    }

    public get usageType(): UsageType {
        return this[usageTypeKey];
    }

    public get fullName(): string {
        return this[fullNameKey];
    }

    public get scopedParent(): Control | undefined {
        return this[scopedParentKey];
    }

    protected [Symbols.Control_definition]: IControlDefinition;

    protected [Symbols.Control_usage]: IControlUsage;

    private [fullNameKey] = "";

    private [scopedParentKey]: Control | undefined;

    private [usageTypeKey]: UsageType = UsageType.item;

    private readonly [itemsKey]: ControlCollection = new ControlCollection();

    private readonly [childrenKey]: ControlCollection = new ControlCollection();

    private readonly [store]: unknown;

    public [Symbols.Control_setState](path: string, value: unknown): void {
        // set state value by path
    }

    public [Symbols.Control_getState](path: string): void {
        // get state value by path
    }

    public [Symbols.Control_setup](
        fullName: string,
        definition: IControlDefinition,
        usage: IControlUsage,
        usageType: UsageType,
        scopedParent?: Control,
    ): void {
        this[fullNameKey] = fullName;
        this[Symbols.Control_definition] = definition;
        this[Symbols.Control_usage] = usage;
        this[Symbols.Control_usageType] = usageType;
        this[scopedParentKey] = scopedParent;
    }

    // callback from state
    private [handleStore](path: string, value: unknown): void {
        this.ControlEngine[Symbols.ControlEngine_propagateState](this, path, value);
    }

    public abstract [Symbols.Control_build](element: HTMLElement): void;

    public abstract [Symbols.Control_handleChange](path: string, value: unknown): void;

    // public abstract [Symbols.Control_handleEvent](event): void;

    public abstract [Symbols.Control_destroy](): void;
}
