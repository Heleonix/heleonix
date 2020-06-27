import { Injectable } from './injection/Injectable';
import { inject } from '../inject';
import { Symbols } from './Symbols';

export class HeleonixComponent extends Injectable {
  @inject [Symbols.ErrorHandler];
}
