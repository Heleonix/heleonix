import { InvalidInjectableError } from "../errors/InvalidInjectableError";
import { Injectable } from "./Injectable";
import { Symbols } from "../Symbols";

function assertIsInjectable(target: Injectable): void {
    if (!(target instanceof Injectable)) {
        throw new InvalidInjectableError((target as typeof Injectable).constructor.name);
    }
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
function emptySetter(): void {}

export function inject(target: Injectable, key: string | symbol): void {
    assertIsInjectable(target);

    Object.defineProperty(target, key, {
        enumerable: false,
        configurable: false,
        get() {
            const diContainer = (this as Injectable)[Symbols.DIContainer];

            return diContainer.inject<Injectable>(key, this);
        },
        set: emptySetter,
    });
}
