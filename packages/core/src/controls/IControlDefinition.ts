import { IControlUsage } from "./IControlUsage";

export interface IControlDefinition {
    tag: string;

    type?: string;

    items?: IControlUsage[];
}
