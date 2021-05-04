/**
* DevExtreme (exporter/excel/excel.doc_comments.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface ExcelFont {
    /**
     * Specifies whether the text should be in bold.
     */
    bold?: boolean;
    /**
     * The text's color in hexadecimal characters.
     */
    color?: string;
    /**
     * Specifies whether the text should be in italic.
     */
    italic?: boolean;
    /**
     * The name of the typeface that should be applied to the text.
     */
    name?: string;
    /**
     * The font size specified in points (1/72 of an inch).
     */
    size?: number;
    /**
     * The underline formatting style.
     */
    underline?: 'double' | 'doubleAccounting' | 'none' | 'single' | 'singleAccounting';
}
