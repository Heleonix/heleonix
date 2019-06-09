import { formatErrorMessage, ERROR_MESSAGES } from './Errors';
import { SYMBOLS } from './Symbols';

const DECORATOR_USAGES = {
  inject: {
    Dictionary: { Style: true, ViewModel: true },
    Service: { Service: true, Model: true },
    Model: { ViewModel: true }
  },
  data: { Model: true },
  operation: { Model: true },
  event: { ViewModel: true },
  handler: { ViewModel: true },
  property: { ViewModel: true },
  state: { ViewModel: true }
};

export const validateEmptyFieldDecoration = definition => {
  if (definition.kind !== 'field' || definition.initializer !== undefined) {
    throw new Error(formatErrorMessage(ERROR_MESSAGES.decoratorApplicableToEmptyFieldOnly));
  }
};

export const validateDecoratorUsage = (target, fieldName, decoratorName) => {
  if (!DECORATOR_USAGES[decoratorName] || !DECORATOR_USAGES[decoratorName][target[SYMBOLS.kind]]) {
    throw new Error(formatErrorMessage(ERROR_MESSAGES.decoratorUsageIsWrong, decoratorName, target[SYMBOLS.kind]));
  }
};

export const validateInjectDecoratorUsage = (target, fieldName) => {
  const injectableKind = target[SYMBOLS.app].components[fieldName][SYMBOLS.kind];
  if (!DECORATOR_USAGES.inject[injectableKind] || !DECORATOR_USAGES.inject[injectableKind][target[SYMBOLS.kind]]) {
    throw new Error(
      formatErrorMessage(
        ERROR_MESSAGES.injectDecoratorUsageIsWrong,
        target[SYMBOLS.app].components[fieldName][SYMBOLS.kind],
        target[SYMBOLS.kind]
      )
    );
  }
};
