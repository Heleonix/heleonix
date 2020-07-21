import { HeleonixComponent } from './HeleonixComponent';
import { Symbols } from './Symbols';

export class ObservableComponent extends HeleonixComponent {
  #observers = [];

  [Symbols.subscribe](observer) {
    if (observer && observer.observe) {
      this.observers.push(observer);
    }
  }

  [Symbols.unsubscribe](observer) {
    const index = this[Symbols.observers].indexOf(observer);

    if (index !== -1) {
      this[Symbols.observers].splice(index, 1);
    }
  }

  notify(event, args) {
    for (let i = this[Symbols.observers].length; i >= 0; i -= 1) {
      try {
        this[Symbols.observers][i].observe(this, event, args ?? null);
      } catch (e) {
        this[Symbols.ErrorHandler][Symbols.handle](e);
      }
    }
  }
}
