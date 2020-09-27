import { Component } from "../Component";
import { inject } from "../injection/inject";
import { automatic } from "../injection/automatic";
import { ControlManager } from "./ControlManager";
import { Symbols } from "../Symbols";
import { IControlUsage } from "./IControlUsage";
import { Control } from "./Control";
import { UsageType } from "./UsageType";
import { IControlProperty } from "./IControlProperty";

const findScopedParent = Symbol("findScopedParent");

export class ControlEngine extends Component {
    @inject private readonly [Symbols.ControlManager] = automatic<ControlManager>();

    public buildItem(usage: IControlUsage, parent: Control | undefined, element: HTMLElement): Control | undefined {
        try {
            const control = this[Symbols.ControlManager].createControl(
                (parent ? parent.fullName + "." : "") + usage.name,
                usage,
                UsageType.item,
                parent,
            );

            if (parent) {
                parent.items.add(control);
            }

            control[Symbols.Control_build](element);

            return control;
        } catch (e) {
            this[Symbols.ErrorHandler][Symbols.ErrorHandler_handle](e);

            return undefined;
        }
    }

    public buildChild(usage: IControlUsage, parent: Control, element: HTMLElement): void {
        try {
            const scopedParent = this[findScopedParent](parent);

            const control = this[Symbols.ControlManager].createControl(
                (scopedParent ? scopedParent.fullName + "." : "") + usage.name,
                usage,
                UsageType.child,
                scopedParent,
            );

            if (parent) {
                parent.children.add(control);
            }

            control[Symbols.Control_build](element);
        } catch (e) {
            this[Symbols.ErrorHandler][Symbols.ErrorHandler_handle](e);
        }
    }

    public emitUpdate(source: Control, property: string, value: unknown): void {
        try {
            const properties = source[Symbols.Control_usage].properties;

            if (!properties) {
                return;
            }

            let binding: string | undefined = undefined;

            for (let i = 0; i < properties.length; i++) {
                if (properties[i].name === property) {
                    binding = properties[i].binding;

                    break;
                }
            }

            if (!binding) {
                return;
            }

            let stateOwner: Control | undefined = source;

            while (!this.isStateBinding(binding)) {
                stateOwner = source.scopedParent;

                if (stateOwner) {
                    const properties = stateOwner[Symbols.Control_usage].properties;

                    if (!properties) {
                        return;
                    }

                    for (const property of properties) {
                        if (binding.startsWith(property.name, 1)) {
                            binding = binding.replace("@" + property.name, property.binding);

                            break;
                        }
                    }
                }
            }

            if (!stateOwner) {
                return;
            }

            stateOwner[Symbols.Control_setState](binding.substring(1), value);
        } catch (e) {
            this[Symbols.ErrorHandler][Symbols.ErrorHandler_handle](e);
        }
    }

    public emitEvent(): void {
        try {
        } catch (e) {
            this[Symbols.ErrorHandler][Symbols.ErrorHandler_handle](e);
        }
    }

    public destroy(control: Control): void {
        try {
        } catch (e) {
            this[Symbols.ErrorHandler][Symbols.ErrorHandler_handle](e);
        }
    }

    public isPropertyBinding(binding?: string): boolean {
        return binding?.[0] === "@";
    }

    public isStateBinding(binding?: string): boolean {
        return binding?.[0] === ".";
    }

    public getValue(control: Control, property: string): unknown {
        try {
            const properties = control[Symbols.Control_usage].properties;

            if (!properties) {
                return;
            }

            let binding: string | undefined = undefined;

            const boundProperties: IControlProperty[] = [];

            for (const prop of properties) {
                if (prop.name === property) {
                    binding = prop.binding;

                    boundProperties.push(prop);

                    break;
                }
            }

            if (!binding) {
                return;
            }

            let stateOwner: Control | undefined = control;

            while (!this.isStateBinding(binding)) {
                stateOwner = control.scopedParent;

                if (stateOwner) {
                    const properties = stateOwner[Symbols.Control_usage].properties;

                    if (!properties) {
                        return;
                    }

                    for (const prop of properties) {
                        if (binding.startsWith(prop.name, 1)) {
                            binding = binding.replace("@" + prop.name, prop.binding);

                            boundProperties.push(prop);

                            break;
                        }
                    }
                }
            }

            if (!stateOwner) {
                return undefined;
            }

            const stateValue = stateOwner[Symbols.Control_getState](binding.substring(1));

            // TODO:
            // - apply formatters from converters in found boundProperties in the corresponding order
            // - return formatted value

            return stateValue;
        } catch (e) {
            this[Symbols.ErrorHandler][Symbols.ErrorHandler_handle](e);

            return undefined;
        }
    }

    public propagateUpdate(target: Control, binding: string, value: unknown): void {
        try {
            for (const property of target[Symbols.Control_usage].properties || []) {
                if (property.binding.startsWith(binding) || binding.startsWith(property.binding)) {
                    for (let i = 0; i < target.items.count; i++) {
                        target.items.get(i)[Symbols.Control_handleUpdate]("@" + property.name, value);
                    }
                }
            }

            for (let i = 0; i < target.children.count; i++) {
                target.children.get(i)[Symbols.Control_handleUpdate](binding, value);
            }
        } catch (e) {
            this[Symbols.ErrorHandler][Symbols.ErrorHandler_handle](e);
        }
    }

    public [Symbols.ControlEngine_propagateState](source: Control, path: string, value: unknown): void {
        try {
            const binding = "." + path;

            for (let i = 0; i < source.items.count; i++) {
                this.propagateUpdate(source.items.get(i), binding, value);
            }
        } catch (e) {
            this[Symbols.ErrorHandler][Symbols.ErrorHandler_handle](e);
        }
    }

    private [findScopedParent](parent?: Control): Control | undefined {
        while (parent && parent.usageType !== UsageType.item) {
            parent = parent.scopedParent;
        }

        if (parent) {
            parent = parent.scopedParent;
        }

        return parent;
    }
}
