export const ERROR_MESSAGES = {
  notImplemented: 'Not implemented.',
  decoratorApplicableToEmptyFieldOnly: 'The given decorator can be applied to an empty field only.',
  injectDecoratorUsageIsWrong: 'Injection of the "{0}" into the "{1}" is not allowed.',
  decoratorUsageIsWrong: 'The decorator "{0}" cannot be used in the "{1}".'
};

export const formatErrorMessage = (str, ...args) => {
  let result = str;

  const replaceArg = (value, index) => {
    result = result.replace(`{${index}}`, value);
  };

  args.forEach(replaceArg);

  return result;
};
