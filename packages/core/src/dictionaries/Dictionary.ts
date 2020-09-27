import { Component } from "../Component";
import { IDictionaryDefinition } from "./IDictionaryDefinition";
import { Symbols } from "../Symbols";

export class Dictionary extends Component {
    public [Symbols.Dictionary_setup](definition: IDictionaryDefinition): void {}

    public getValue(key: string): string {
        return "";
    }
}
