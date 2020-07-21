import * as Symbols from "../Symbols";
import { UnknownComponentError } from "../../UnknownComponentError";
import { InjectionNotAllowedError } from "../../InjectionNotAllowedError";
import { Injector } from "./Injector";
import { Injectable } from "./Injectable";

declare type ComponentList = { [index: string]: Injectable };

function assertComponentIsProvided(components, injectingName) {
    if (!components[injectingName]) {
        throw new UnknownComponentError(injectingName);
    }
}

function assertInjectionIsAllowed(component, hostInstance, rules) {
    const canInject = rules.some(
        (r) =>
            (component === r.component || component.prototype instanceof r.component) &&
            r.allowedHosts &&
            r.allowedHosts.some((ah) => hostInstance instanceof ah),
    );

    if (!canInject) {
        throw new InjectionNotAllowedError(component.name, hostInstance.constructor.name);
    }
}

export class DIContainer {
    private readonly components: { [index: string]: Injectable };

    private readonly rules: Array<{ component: Injectable; allowedHosts: Injectable[] }>;

    private readonly instances = new Map();

    private readonly injector = new Injector(this);

    constructor(
        components: { [index: string]: Injectable },
        rules: Array<{ component: Injectable; allowedHosts: Injectable[] }>,
    ) {
        this.components = { ...components };

        this.rules = rules.map((rule) => ({ ...rule, allowedHosts: [...rule.allowedHosts] }));
    }

    getInstance(propertyName: string, hostInstance: Injectable) {
        if (!this.instances.has(propertyName)) {
            assertComponentIsProvided(this.components, propertyName);

            const Component = this.#components[propertyName];

            const instance = new Component(this.#injector);

            this.#instances.set(propertyName, instance);
        }

        const instance = this.#instances.get(propertyName);

        assertInjectionIsAllowed(instance.constructor, hostInstance, this.#rules);

        return instance;
    }

    createInstance(propertyName, hostInstance) {
        assertComponentIsProvided(this.#components, propertyName);

        const Component = this.#components[propertyName];

        assertInjectionIsAllowed(Component, hostInstance, this.#rules);

        const instance = new Component(this.#injector);

        return instance;
    }
}
