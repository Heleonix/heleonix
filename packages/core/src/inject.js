import { Symbols } from './internal/Symbols';
import { InvalidInjectableMemberError } from './errors/InvalidInjectableMemberError';
import { InvalidInjectableError } from './errors/InvalidInjectableError';

function assertCorrectMember(definition) {
  if (definition.kind !== 'field' && definition.placement !== 'own') {
    throw new InvalidInjectableMemberError(definition.key);
  }
}

function assertIsInjectable(instance) {
  if (!instance?.[Symbols.DIContainer]) {
    throw new InvalidInjectableError(instance?.constructor.name);
  }
}

export function inject(definition) {
  assertCorrectMember(definition);

  const def = definition;
  const { key } = def;

  def.descriptor = {};

  def.initializer = function initializer() {
    assertIsInjectable(this);

    return this[Symbols.DIContainer].getInstanceForInjection(key, this);
  };

  return def;
}
