export class HeleonixError extends Error {
    constructor(message: string, ...rest: string[]) {
        const formattedMsg = HeleonixError.formatMessage(message, ...rest);

        super(formattedMsg);

        Object.setPrototypeOf(this, HeleonixError.prototype);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, HeleonixError);
        }

        this.name = this.constructor.name;
    }

    private static formatMessage(formatString: string, ...args: string[]): string {
        let result = formatString;

        function replaceArg(value: string, index: number) {
            result = result.replace(`{${index}}`, value);
        }

        args.forEach(replaceArg);

        return result;
    }
}
