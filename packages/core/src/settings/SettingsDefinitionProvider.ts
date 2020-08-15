import { Symbols } from "../Symbols";
import { IDictionaryDefinition } from "../../types/IDictionaryDefinition";
import { DefinitionGettingError } from "../errors/DefinitionGettingError";
import { Component } from "../Component";

export abstract class SettingsDefinitionProvider extends Component {
    public [Symbols.Provider_getDefinition](settingsName: string): IDictionaryDefinition {
        try {
            return this.getDefinition(dictionaryName);
        } catch (e) {
            this[Symbols.ErrorHandler][Symbols.ErrorHandler_handle](e);

            throw new DefinitionGettingError(dictionaryName);
        }
    }

    public abstract getDefinition(dictionaryName: string): IDictionaryDefinition;
}
