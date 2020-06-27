import { error, ERROR_MESSAGES } from './Errors';
import { SYMBOLS } from './Symbols';

const DECORATOR_USAGES = {
  inject: {
    Context: { Dictionary: true, Style: true, View: true, Model: true, ViewModel: true },
    Dictionary: { Style: true, ViewModel: true },
    Service: { Model: true },
    Model: { ViewModel: true }
  },
  data: { Model: true },
  operation: { Model: true },
  property: { ViewModel: true },
  state: { ViewModel: true },
  event: { Model: true, ViewModel: true, Context: true },
  handler: { Model: true, ViewModel: true, Dictionary: true, Style: true, View: true }
};

export function validateEmptyFieldDecoration(definition) {
  if (definition.kind !== 'field' || definition.initializer !== undefined) {
    throw error(ERROR_MESSAGES.decoratorApplicableToEmptyFieldOnly);
  }
}

export function validateMethodDecoration(definition) {
  if (definition.kind !== 'method') {
    throw error(ERROR_MESSAGES.decoratorApplicableToMethodOnly);
  }
}

export function validateInitializedFieldDecoration(definition) {
  if (definition.kind !== 'field' || definition.initializer === undefined) {
    throw error(ERROR_MESSAGES.decoratorApplicableToInitializedFieldOnly);
  }
}

export function validateInitializedFieldOrGetterDecoration(definition) {
  if (
    definition.kind !== 'field' &&
    (definition.kind !== 'method' || definition.descriptor.get === undefined || definition.descriptor.set !== undefined)
  ) {
    throw error(ERROR_MESSAGES.decoratorApplicableToInitializedFieldOrGetterOnly);
  }
}

export function validateDecoratorUsage(target, decoratorName) {
  if (!DECORATOR_USAGES[decoratorName][target.constructor[SYMBOLS.kind]]) {
    throw error(ERROR_MESSAGES.decoratorUsageIsWrong, decoratorName, target.constructor[SYMBOLS.kind]);
  }
}

export function validateInjectDecoratorUsage(target, fieldName) {
  const injectableKind = target[SYMBOLS.app][SYMBOLS.getComponent](fieldName)[SYMBOLS.kind];
  if (!DECORATOR_USAGES.inject[injectableKind] || !DECORATOR_USAGES.inject[injectableKind][target[SYMBOLS.kind]]) {
    throw error(
      ERROR_MESSAGES.injectDecoratorUsageIsWrong,
      target[SYMBOLS.app][SYMBOLS.getComponent](fieldName)[SYMBOLS.kind],
      target[SYMBOLS.kind]
    );
  }
}
