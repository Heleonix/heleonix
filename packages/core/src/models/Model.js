import { SYMBOLS } from '../internal/Symbols';
import { ObservableComponent } from '../ObservableComponent';

export class Model extends ObservableComponent {
  static get [SYMBOLS.kind]() {
    return 'Model';
  }
}
