/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import { Component } from '../Component';
import { inject } from '../inject';
import { notification } from '../internal/notification';
import { SYMBOLS } from '../internal/Symbols';
import { ERROR_MESSAGES, error } from '../internal/Errors';
import { handler } from '../handler';

export class Resource extends Component {
  @inject Context;

  @notification [SYMBOLS.changed];

  constructor(injector) {
    super(injector);

    this.Context.changed.add(this.handleChangedContext);
  }

  load(prevContext, currentContext) {
    throw error(ERROR_MESSAGES.notImplemented);
  }

  apply(resource) {
    if (!resource) {
      throw error(ERROR_MESSAGES.valueNotProvided, 'resource');
    }
  }

  @handler handleChangedContext(prevContext, currentContext) {
    const resource = this.load(prevContext, currentContext);

    this.apply(resource);

    this[SYMBOLS.changed]();
  }
}
