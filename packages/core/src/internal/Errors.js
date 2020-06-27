export const ERROR_MESSAGES = {
  notImplemented: 'Not implemented.',
  decoratorApplicableToEmptyFieldOnly: 'The given decorator can be applied to an empty field only.',
  decoratorApplicableToInitializedFieldOnly: 'The given decorator can be applied to an initialized field only.',
  decoratorApplicableToInitializedFieldOrGetterOnly:
    'The given decorator can be applied to an initialized field or getter only.',
  decoratorApplicableToMethodOnly: 'The given decorator can be applied to a method only.',
  injectDecoratorUsageIsWrong: 'Injection of the "{0}" into the "{1}" is not allowed.',
  decoratorUsageIsWrong: 'The decorator "{0}" cannot be used in the "{1}".',
  componentNotRegistered: 'A component with the key {0} not registered',
  valueNotProvided: 'The "{0}" was not provided (got null, undefined, etc.).',
  handlerNotProvided: 'Only a handler method, marked with @handler can be provided.',
  typeNotSupported: 'The type "{0}" is not supported.',
  onlyPrimitiveCanBeSet: 'Only a primitive value can be set.'
};

function formatErrorMessage(str, ...args) {
  let result = str;

  function replaceArg(value, index) {
    result = result.replace(`{${index}}`, value);
  }

  args.forEach(replaceArg);

  return result;
}

export function error(str, ...args) {
  return new Error(formatErrorMessage(str, ...args));
}
