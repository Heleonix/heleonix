import { Symbols } from "../Symbols";
import { Injector } from "./Injector";
import { InvalidInjectableError } from "./../errors/InvalidInjectableError";
import { DIContainer } from "./DIContainer";

function assertIsInjectable(componentName: string, injector: Injector): void {
    if (!injector?.[Symbols.DIContainer]) {
        throw new InvalidInjectableError(componentName);
    }
}

export abstract class Injectable {
    public [Symbols.DIContainer]: DIContainer;

    public constructor(injector: unknown) {
        assertIsInjectable(this.constructor.name, injector as Injector);

        this[Symbols.DIContainer] = (injector as Injector)[Symbols.DIContainer];
    }
}
