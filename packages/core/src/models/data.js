import { validateInitializedFieldOrGetterDecoration } from '../internal/Rules';
import { makeObservable } from '../internal/helpers';

export function data(definition) {
  validateInitializedFieldOrGetterDecoration(definition);

  return makeObservable(definition, 'data');
}
