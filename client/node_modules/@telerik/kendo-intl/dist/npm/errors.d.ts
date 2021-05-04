declare class IntlError {
    name: string;
    message: string;
    constructor(error: { name: string, message: string });
    formatMessage(...values: any[]): string;
    error(...values: any[]): Error;
}
declare const errors: any;
declare const toIntlErrors: (errors: { [x: string]: string; }) => { [x: string]: IntlError };

export { errors, IntlError, toIntlErrors };
