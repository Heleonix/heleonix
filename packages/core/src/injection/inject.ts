import { InvalidInjectableError } from "../errors/InvalidInjectableError";
import { Injectable } from "./Injectable";
import { Symbols } from "./../Symbols";

function assertIsInjectable(instance: Injectable) {
    if (!(instance instanceof Injectable)) {
        throw new InvalidInjectableError(instance.constructor.name);
    }
}

export function inject(target: Injectable, key: string): void {
    Object.defineProperty(target, key, {
        enumerable: false,
        configurable: false,
        get() {
            assertIsInjectable(this);

            return (this as Injectable)[Symbols.DIContainer].getInstance(key, this);
        },
    });
}
