import { Component } from "../Component";
import { inject } from "../injection/inject";
import { ControlDefinitionProvider } from "./ControlDefinitionProvider";
import { Symbols } from "../Symbols";
import { ControlCreationError } from "../errors/ControlCreationError";
import { automatic } from "../injection/automatic";
import { Control } from "./Control";
import { IControlUsage } from "./IControlUsage";
import { DefinitiveControl } from "./DefinitiveControl";
import { UsageType } from "./UsageType";

export class ControlManager extends Component {
    @inject private readonly ControlDefinitionProvider = automatic<ControlDefinitionProvider>();

    public createControl(
        fullName: string,
        usage: IControlUsage,
        usageType: UsageType,
        scopedParent?: Control,
    ): Control {
        try {
            const definition = this.ControlDefinitionProvider[Symbols.Provider_getDefinition](usage.tag);

            if (!definition.type) {
                definition.type = DefinitiveControl.name;
            }

            const instance = this[Symbols.DIContainer].inject<Control>(definition.type, this);

            instance[Symbols.Control_setup](fullName, definition, usage, usageType, scopedParent);

            return instance;
        } catch (e) {
            this[Symbols.ErrorHandler][Symbols.ErrorHandler_handle](e);

            throw new ControlCreationError(usage.tag);
        }
    }
}
