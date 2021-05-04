import { DateFormatter } from './date';
import { NumberFormatter } from './number';
import { IFormattersOptions } from './options';
import { StringFormatter } from './string';
export declare class SimpleFormattersManager {
    stringFormatter: StringFormatter;
    dateFormatter: DateFormatter;
    numberFormatter: NumberFormatter;
    options: IFormattersOptions;
    constructor(options: IFormattersOptions);
    formatString(pattern: string, ...args: any[]): string;
    formatDate(format: string, date: Date): string;
    formatNumber(format: string, value: number): string;
}
//# sourceMappingURL=manager.d.ts.map
