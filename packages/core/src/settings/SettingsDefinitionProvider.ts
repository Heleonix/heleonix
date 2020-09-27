import { Symbols } from "../Symbols";
import { IDictionaryDefinition } from "../dictionaries/IDictionaryDefinition";
import { DefinitionGettingError } from "../errors/DefinitionGettingError";
import { Component } from "../Component";

export abstract class SettingsDefinitionProvider extends Component {
    public [Symbols.Provider_getDefinition](settingsName: string): IDictionaryDefinition {
        try {
            return this.getDefinition(settingsName);
        } catch (e) {
            this[Symbols.ErrorHandler][Symbols.ErrorHandler_handle](e);

            throw new DefinitionGettingError(settingsName);
        }
    }

    public abstract getDefinition(settingsName: string): IDictionaryDefinition;
}
