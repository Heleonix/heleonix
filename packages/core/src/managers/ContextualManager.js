import { Manager } from './Manager';
import { inject } from '../../inject';
import { Context } from '../Context';
import { Symbols } from '../Symbols';

export class ContextualManager extends Manager {
  @inject Context;

  constructor(...args) {
    super(args);

    Context[Symbols.subscribe](this);
  }

  observe(sender, event, args) {}
}
