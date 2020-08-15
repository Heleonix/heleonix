import { Control } from "./Control";
import { Symbols } from "../Symbols";

const items = Symbol("items");
const hostControl = Symbol("host");

export class ControlCollection {
    private readonly [hostControl]: Control;

    private readonly [items]: Control[] = [];

    public constructor(host: Control) {
        this[hostControl] = host;
    }

    public add(control: Control): void {
        this[items].push(control);
        control[Symbols.Control_parent] = this[hostControl];
    }

    public attach(control: Control): void {
        this[items].push(control);
    }

    public remove(control: Control): void {
        const index = this[items].indexOf(control);

        if (index >= 0) {
            if (this[hostControl] === control[Symbols.Control_parent]) {
                control[Symbols.Control_parent] = null;
            }

            this[items].splice(index, 1);
        }
    }

    public clear(): void {
        for (const item of this[items]) {
            if (this[hostControl] === item[Symbols.Control_parent]) {
                item[Symbols.Control_parent] = null;
            }
        }

        this[items].splice(0, this[items].length);
    }
}
