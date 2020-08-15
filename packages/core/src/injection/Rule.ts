import { Injectable } from "./Injectable";

export class Rule {
    public constructor(
        public readonly component: typeof Injectable,
        public readonly isSingleton: boolean,
        public readonly allowedHosts: typeof Injectable[],
    ) {}
}
