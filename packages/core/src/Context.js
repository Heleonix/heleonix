import { Component } from './Component';
import { SYMBOLS } from './internal/Symbols';
import { event } from './event';

export class Context extends Component {
  @event changed;

  static get [SYMBOLS.kind]() {
    return 'Context';
  }
}
