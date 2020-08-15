import { Symbols } from "../Symbols";
import { HeleonixError } from "./HeleonixError";
import { Injectable } from "../injection/Injectable";

export class ErrorHandler extends Injectable {
    public [Symbols.ErrorHandler_handle](error: HeleonixError): void {
        try {
            this.handle(error);
            // eslint-disable-next-line no-empty
        } catch (e) {}
    }

    public handle(error: HeleonixError): void {
        console.log(error);
    }
}
