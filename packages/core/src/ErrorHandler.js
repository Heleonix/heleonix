import { Injectable } from './internal/injection/Injectable';
import { Symbols } from './internal/Symbols';

export class ErrorHandler extends Injectable {
  [Symbols.handle](error) {
    try {
      this.handle(error);
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }

  // eslint-disable-next-line class-methods-use-this
  handle(error) {
    try {
      // eslint-disable-next-line no-console
      console.log(error);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }
}
