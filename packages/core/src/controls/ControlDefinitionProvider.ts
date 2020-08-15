import { DefinitionGettingError } from "../errors/DefinitionGettingError";
import { Symbols } from "../Symbols";
import { Component } from "../Component";
import { IControlDefinition } from "../../types/IControlDefinition";
import { DomElement } from "./DomElement";
import { Children } from "./Children";

function isDomElementName(name: string): boolean {
    const code = name.charCodeAt(0);

    return code >= 97 && code <= 122;
}

export abstract class ControlDefinitionProvider extends Component {
    public [Symbols.Provider_getDefinition](controlName: string): IControlDefinition {
        try {
            if (isDomElementName(controlName)) {
                return { control: DomElement.name, items: [] };
            }

            if (
                controlName === Children.name
                // || controlName === OnEvent.name
                // || controlName === OnChange.name
                // || controlName === Set.name
                // || controlName === Raise.name
                // || controlName === Run.name
                // || controlName === OnSuccess.name
                // || controlName === OnFail.name
            ) {
                return { control: controlName, items: [] };
            }

            return this.getDefinition(controlName);
        } catch (e) {
            this[Symbols.ErrorHandler][Symbols.ErrorHandler_handle](e);

            throw new DefinitionGettingError(controlName);
        }
    }

    abstract getDefinition(controlName: string): IControlDefinition;
}
