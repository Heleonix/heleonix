import { Injector } from "./Injector";
import { Injectable } from "./Injectable";
import { Rule } from "./Rule";
import { UnknownComponentError } from "./../errors/UnknownComponentError";
import { InjectionNotAllowedError } from "./../errors/InjectionNotAllowedError";
import { Symbols } from "./../Symbols";

function assertComponentIsProvided(componentName: string | symbol, component: typeof Injectable | undefined) {
    if (!component) {
        throw new UnknownComponentError(componentName.toString());
    }
}

function assertRuleIsProvided(componentName: string | symbol, rule: Rule | undefined) {
    if (!rule) {
        throw new UnknownComponentError(componentName.toString());
    }
}

function assertInjectionIsAllowed(componentName: string | symbol, hostInstance: Injectable, rule: Rule) {
    if (!rule.allowedHosts.some((allwedHost) => hostInstance instanceof allwedHost)) {
        throw new InjectionNotAllowedError(componentName.toString(), hostInstance.constructor.name);
    }
}

export class DIContainer {
    private readonly instances = new Map<string | symbol, Injectable>();

    private readonly injector = new Injector(this);

    private readonly components = new Map<string | symbol, typeof Injectable>();

    public constructor(components: { [index: string]: typeof Injectable }, private readonly rules: Rule[]) {
        for (const key in components) {
            this.components.set(key, components[key]);
        }
    }

    public init(root: Injectable): void {
        root[Symbols.DIContainer] = this;
    }

    public inject<TInjectable extends Injectable>(
        componentName: string | symbol,
        hostInstance: Injectable,
    ): TInjectable {
        if (this.instances.has(componentName)) {
            return this.instances.get(componentName) as TInjectable;
        }

        const component = this.components.get(componentName) as { new (injector: Injector): Injectable };

        assertComponentIsProvided(componentName, component);

        const rule = this.rules.find((rule) => component instanceof rule.component);

        assertRuleIsProvided(componentName, rule);

        assertInjectionIsAllowed(componentName, hostInstance, rule as Rule);

        const instance = new component(this.injector);

        if ((rule as Rule).isSingleton) {
            this.instances.set(componentName, instance);
        }

        return instance as TInjectable;
    }
}
