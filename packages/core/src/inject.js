import { validateEmptyFieldDecoration, validateInjectDecoratorUsage } from './internal/Rules';
import { SYMBOLS } from './internal/Symbols';

export function inject(definition) {
  validateEmptyFieldDecoration(definition);

  const def = definition;
  const { key } = def;

  def.descriptor = {};

  def.initializer = function initializer() {
    validateInjectDecoratorUsage(this, key);

    return this[SYMBOLS.app][SYMBOLS.getInstance](key);
  };

  return def;
}
