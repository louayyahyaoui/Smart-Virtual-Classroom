import { DateFormatter } from './date';
import { NumberFormatter } from './number';
export declare class StringFormatter {
    private readonly dateFormatter;
    private readonly numberFormatter;
    private activeDateFormat;
    constructor(dateFormatter: DateFormatter, numberFormatter: NumberFormatter);
    format(pattern: string, ...args: any[]): string;
    private parseSpec;
}
//# sourceMappingURL=string.d.ts.map
