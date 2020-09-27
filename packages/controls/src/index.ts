const s = Symbol("s");
import { IType } from "./types/IType";

import { Application, ControlDefinitionProvider, IControlDefinition } from "@heleonix/core";

class CD extends ControlDefinitionProvider {
    public getDefinition(): IControlDefinition {
        throw "asdf";
    }
}

export class Cls extends Application {
    public [s]: IType = { a: "a" };

    public get controlDefinitionProvider(): typeof ControlDefinitionProvider {
        return CD;
    }
}
