import { IControlUsage } from "./IControlUsage";

export interface IControlDefinition {
    control: string;

    items: IControlUsage[];
}
