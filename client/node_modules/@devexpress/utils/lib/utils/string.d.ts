export declare class StringUtils {
    static isAlpha(ch: string): boolean;
    static isDigit(ch: string): boolean;
    static stringHashCode(str: string): number;
    static endsAt(str: string, template: string): boolean;
    static startsAt(str: string, template: string): boolean;
    static stringInLowerCase(str: string): boolean;
    static stringInUpperCase(str: string): boolean;
    static atLeastOneSymbolInUpperCase(str: string): boolean;
    static getSymbolFromEnd(text: string, posFromEnd: number): string;
    static trim(str: string, trimChars?: string[]): string;
    static trimStart(str: string, trimChars?: string[]): string;
    static trimEnd(str: string, trimChars?: string[]): string;
    static getDecimalSeparator(): string;
    static repeat(str: string, count: number): string;
    static isNullOrEmpty(str: string | null | undefined): boolean;
    static padLeft(str: string, totalWidth: number, paddingChar: string): string;
    private static trimInternal;
}
//# sourceMappingURL=string.d.ts.map
