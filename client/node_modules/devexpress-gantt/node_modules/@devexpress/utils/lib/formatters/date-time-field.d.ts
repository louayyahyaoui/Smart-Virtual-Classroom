import { IDateFormatterOptions } from './options';
export declare class DateTimeFieldFormatter {
    private date;
    private formatString;
    private result;
    private AMPMKeyword;
    private readonly options;
    constructor(options: IDateFormatterOptions);
    format(date: Date, formatString: string): string;
    private formatNext;
    private isKeyword;
    private processAsAMPMKeyword;
    private processAsEmbedText;
    private processAsSingleCharacter;
    private processAsFormattingItem;
    private getCharacterSequenceLength;
    private tryCreateFormattingItem;
    private charsAreEqual;
    private charsAreNotEqual;
}
//# sourceMappingURL=date-time-field.d.ts.map
