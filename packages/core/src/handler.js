import { SYMBOLS } from './internal/Symbols';
import { validateDecoratorUsage, validateMethodDecoration } from './internal/Rules';

export function handler(definition) {
  validateMethodDecoration(definition);

  const def = definition;
  const { value } = def.descriptor;

  def.descriptor = {};
  def.kind = 'field';
  def.placement = 'own';

  def.initializer = function initializer() {
    validateDecoratorUsage(this, 'handler');

    const self = this;

    const boundHandler = function boundHandler(args) {
      value.call(self, ...args);
    };

    boundHandler[SYMBOLS.isHandler] = true;

    return boundHandler;
  };

  return def;
}
