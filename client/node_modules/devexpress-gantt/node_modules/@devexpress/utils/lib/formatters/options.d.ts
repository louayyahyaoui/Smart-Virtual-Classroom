export interface IDateFormatterOptions {
    twoDigitYearMax: number;
    ts: string;
    ds: string;
    am: string;
    pm: string;
    monthNames: string[];
    genMonthNames: string[];
    abbrMonthNames: string[];
    abbrDayNames: string[];
    dayNames: string[];
    shortTime: string;
    longTime: string;
    shortDate: string;
    longDate: string;
    monthDay: string;
    yearMonth: string;
}
export interface INumberFormatterOptions {
    numDecimalPoint: string;
    numPrec: number;
    numGroupSeparator: string;
    numGroups: number[];
    numNegPattern: number;
    numPosInf: string;
    numNegInf: string;
    numNan: string;
    currency: string;
    currDecimalPoint: string;
    currPrec: number;
    currGroupSeparator: string;
    currGroups: number[];
    currPosPattern: number;
    currNegPattern: number;
    percentPattern: number;
}
export interface IFormattersOptions extends IDateFormatterOptions, INumberFormatterOptions {
    clone(): IFormattersOptions;
}
//# sourceMappingURL=options.d.ts.map
