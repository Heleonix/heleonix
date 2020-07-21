import { Symbols } from "./../Symbols";
import { DIContainer } from "./DIContainer";

export class Injector {
    public readonly [Symbols.DIContainer]: DIContainer;

    constructor(diContainer: DIContainer) {
        this[Symbols.DIContainer] = diContainer;
    }
}
