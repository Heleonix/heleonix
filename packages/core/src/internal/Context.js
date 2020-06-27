import { ObservableComponent } from './ObservableComponent';
import { Events } from './Events';

export class Context extends ObservableComponent {
  #context = {};

  get current() {
    return { ...this.#context };
  }

  change(diff) {
    const previousContext = this.current;

    this.#context = { ...previousContext, ...diff };

    this.notify(Events.CONTEXT_CHANGED);
  }
}
