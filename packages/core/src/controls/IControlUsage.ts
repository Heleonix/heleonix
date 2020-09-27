import { IControlProperty } from "./IControlProperty";

export interface IControlUsage {
    tag: string;

    name: string;

    properties?: IControlProperty[];

    children?: IControlUsage[];
}
