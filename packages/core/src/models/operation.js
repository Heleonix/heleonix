import { validateMethodDecoration, validateDecoratorUsage } from '../internal/Rules';

export function operation(definition) {
  validateMethodDecoration(definition);

  const def = definition;
  const { value } = def.descriptor;

  def.descriptor = {};
  def.kind = 'field';
  def.placement = 'prototype';

  def.initializer = function initializer() {
    validateDecoratorUsage(this, 'operation');

    return value;
  };

  return def;
}
