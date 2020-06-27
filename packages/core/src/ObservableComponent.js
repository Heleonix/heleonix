import { SYMBOLS } from './internal/Symbols';
import { Component } from './Component';
import { notification } from './internal/notification';

export class ObservableComponent extends Component {
  @notification [SYMBOLS.changed];

  [SYMBOLS.bag];

  constructor(injector) {
    super(injector);

    Object.freeze(this);
  }
}
