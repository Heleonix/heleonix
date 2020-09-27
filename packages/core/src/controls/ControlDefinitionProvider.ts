import { DefinitionGettingError } from "../errors/DefinitionGettingError";
import { Symbols } from "../Symbols";
import { Component } from "../Component";
import { IControlDefinition } from "./IControlDefinition";
import { DomControl } from "./DomControl";
import { Children } from "./Children";

function isDomElementName(name: string): boolean {
    const code = name.charCodeAt(0);

    return code >= 97 && code <= 122;
}

export abstract class ControlDefinitionProvider extends Component {
    public [Symbols.Provider_getDefinition](tag: string): IControlDefinition {
        try {
            if (isDomElementName(tag)) {
                return { tag: tag, type: DomControl.name };
            }

            if (
                tag === Children.name
                // || tag === OnEvent.name
                // || tag === OnChange.name
                // || tag === Set.name
                // || tag === Raise.name
                // || tag === Run.name
                // || tag === OnSuccess.name
                // || tag === OnFail.name
            ) {
                return { tag: tag, type: tag };
            }

            return this.getDefinition(tag);
        } catch (e) {
            this[Symbols.ErrorHandler][Symbols.ErrorHandler_handle](e);

            throw new DefinitionGettingError(tag);
        }
    }

    public abstract getDefinition(tag: string): IControlDefinition;
}
