import { Control } from "./Control";

const items = Symbol("items");

export class ControlCollection {
    private readonly [items]: Control[] = [];

    public add(control: Control): void {
        this[items].push(control);
    }

    public remove(control: Control): void {
        const index = this[items].indexOf(control);

        if (index >= 0) {
            this[items].splice(index, 1);
        }
    }

    public clear(): void {
        this[items].splice(0, this[items].length);
    }

    public get count(): number {
        return this[items].length;
    }

    public get(index: number): Control {
        return this[items][index];
    }
}
