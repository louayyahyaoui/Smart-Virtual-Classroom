/**
* DevExtreme (ui/validation_summary.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import CollectionWidget, {
    CollectionWidgetOptions
} from './collection/ui.collection_widget.base';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxValidationSummaryOptions extends CollectionWidgetOptions<dxValidationSummary> {
    /**
     * Specifies the validation group for which summary should be generated.
     */
    validationGroup?: string;
}
/**
 * A UI component for displaying the result of checking validation rules for editors.
 */
export default class dxValidationSummary extends CollectionWidget {
    constructor(element: Element, options?: dxValidationSummaryOptions)
    constructor(element: JQuery, options?: dxValidationSummaryOptions)
}

declare global {
interface JQuery {
    dxValidationSummary(): JQuery;
    dxValidationSummary(options: "instance"): dxValidationSummary;
    dxValidationSummary(options: string): any;
    dxValidationSummary(options: string, ...params: any[]): any;
    dxValidationSummary(options: dxValidationSummaryOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxValidationSummaryOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxValidationSummaryOptions;