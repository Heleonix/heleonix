import { Component } from "../Component";
import { inject } from "../injection/inject";
import { ControlDefinitionProvider } from "./ControlDefinitionProvider";
import { Symbols } from "../Symbols";
import { ControlCreationError } from "../errors/ControlCreationError";
import { automatic } from "../injection/automatic";
import { Control } from "./Control";
import { IControlUsage } from "../../types/IControlUsage";

export class ControlManager extends Component {
    @inject private readonly ControlDefinitionProvider = automatic<ControlDefinitionProvider>();

    public createControl(usage: IControlUsage): Control {
        try {
            const definition = this.ControlDefinitionProvider[Symbols.Provider_getDefinition](usage.control);
            const control = this[Symbols.DIContainer].inject<Control>(definition.control, this);

            control[Symbols.Control_setup](definition, usage);

            return control;
        } catch (e) {
            this[Symbols.ErrorHandler][Symbols.ErrorHandler_handle](e);

            throw new ControlCreationError(usage.control);
        }
    }
}
