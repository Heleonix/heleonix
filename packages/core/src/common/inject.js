/* eslint-disable no-param-reassign */
import { validateEmptyFieldDecoration, validateInjectDecoratorUsage } from '../internal/Rules';
import { SYMBOLS } from '../internal/Symbols';

export const inject = definition => {
  validateEmptyFieldDecoration(definition);

  definition.descriptor.enumerable = false;
  definition.descriptor.configurable = false;
  definition.descriptor.writable = false;

  definition.initializer = function initializer() {
    validateInjectDecoratorUsage(this, definition.key);

    return this[SYMBOLS.app][SYMBOLS.instances][definition.key];
  };
};
