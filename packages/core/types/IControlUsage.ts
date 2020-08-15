import { IControlData } from "./IControlData";

export interface IControlUsage {
    control: string;

    name: string;

    data: IControlData[];

    children: IControlUsage[];
}
