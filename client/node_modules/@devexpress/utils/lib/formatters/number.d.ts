import { INumberFormatterOptions } from './options';
export declare class NumberFormatter {
    private positive;
    private digits;
    private pointPos;
    private spec;
    private prec;
    private upper;
    private custom;
    private readonly options;
    constructor(options: INumberFormatterOptions);
    format(format: string, value: number): string;
    private formatCurrency;
    private formatDecimal;
    private formatExp;
    private formatExpCore;
    private formatFixed;
    private formatGeneral;
    private formatNumber;
    private formatPercent;
    private formatHex;
    private formatCustom;
    private static getCustomFormatSections;
    private selectCustomFormatSection;
    private static createCustomFormatInfo;
    private static parseCustomFormatSection;
    private createCustomFormatLists;
    private formatCustomCore;
    private fillDigitInfo;
    private fillFormatInfo;
    private round;
    private appendGroupedInteger;
    private appendDigits;
}
//# sourceMappingURL=number.d.ts.map
