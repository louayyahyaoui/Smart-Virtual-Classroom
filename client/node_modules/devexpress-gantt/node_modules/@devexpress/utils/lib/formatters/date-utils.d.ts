export declare class DateUtils {
    static fixTimezoneGap(oldDate: Date, newDate: Date): void;
    static expandTwoDigitYear(value: number, options: {
        twoDigitYearMax: number;
    }): number;
    static toUtcTime(date: Date): Date;
    private static getTimeZoneOffset;
}
//# sourceMappingURL=date-utils.d.ts.map
