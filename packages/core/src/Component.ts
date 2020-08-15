import { Symbols } from "./Symbols";
import { ErrorHandler } from "./errors/ErrorHandler";
import { Injectable } from "./injection/Injectable";
import { inject } from "./injection/inject";

export abstract class Component extends Injectable {
    @inject protected readonly [Symbols.ErrorHandler]: ErrorHandler;
}
