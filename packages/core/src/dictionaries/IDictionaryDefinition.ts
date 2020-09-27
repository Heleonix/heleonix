import { IContext } from "../context/IContext";
import { IDictionaryItem } from "./IDictionaryItem";

export interface IDictionaryDefinition {
    name: string;

    context: IContext;

    items: IDictionaryItem[];
}
