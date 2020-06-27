import { validateInitializedFieldOrGetterDecoration } from '../internal/Rules';
import { makeObservable } from '../internal/helpers';

export function state(definition) {
  validateInitializedFieldOrGetterDecoration(definition);

  return makeObservable(definition, 'state');
}
