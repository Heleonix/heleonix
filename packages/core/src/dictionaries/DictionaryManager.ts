import { Component } from "../Component";
import { inject } from "../injection/inject";
import { Symbols } from "../Symbols";
import { automatic } from "../injection/automatic";
import { Dictionary } from "./Dictionary";
import { DictionaryDefinitionProvider } from "./DictionaryDefinitionProvider";
import { DictionaryCreationError } from "../errors/DictionaryCreationError";

export class DictionaryManager extends Component {
    @inject private readonly DictionaryDefinitionProvider = automatic<DictionaryDefinitionProvider>();

    public createDictionary(name: string): Dictionary {
        try {
            const definition = this.DictionaryDefinitionProvider[Symbols.Provider_getDefinition](name);
            const dictionary = this[Symbols.DIContainer].inject<Dictionary>(name, this);

            dictionary[Symbols.Dictionary_setup](definition);

            return dictionary;
        } catch (e) {
            this[Symbols.ErrorHandler][Symbols.ErrorHandler_handle](e);

            throw new DictionaryCreationError(name);
        }
    }
}
