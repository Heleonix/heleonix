export class HeleonixError extends Error {
  constructor(msg, ...rest) {
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HeleonixError)
    }

    this.name = this.constructor.name;

    const formattedMsg = this.#formatMessage(msg, ...rest);

    super(formattedMsg);
  }

  #formatMessage(str, ...args) {
    let result = str;

    function replaceArg(value, index) {
      result = result.replace(`{${index}}`, value);
    }

    args.forEach(replaceArg);

    return result;
  }
}
