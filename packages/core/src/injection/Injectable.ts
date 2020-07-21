import { Symbols } from "../Symbols";
import { Injector } from "./Injector";
import { InvalidInjectableError } from "./../errors/InvalidInjectableError";
import { DIContainer } from "./DIContainer";

function assertIsInjectable(componentName: string, injector: Injector): void {
    if (!injector?.[Symbols.DIContainer]) {
        throw new InvalidInjectableError(componentName);
    }
}

export class Injectable {
    public readonly [Symbols.DIContainer]: DIContainer;

    constructor(injector: Injector) {
        assertIsInjectable(this.constructor.name, injector);

        this[Symbols.DIContainer] = injector[Symbols.DIContainer];
    }
}
