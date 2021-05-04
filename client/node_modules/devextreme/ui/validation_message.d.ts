/**
* DevExtreme (ui/validation_message.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import '../jquery_augmentation';

import dxOverlay, {
    dxOverlayOptions
} from './overlay';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxValidationMessageOptions<T = dxValidationMessage> extends dxOverlayOptions<T> {
    mode?: string;

    validationErrors?: Array<object> | null;

    positionRequest?: string;

    boundary?: String | Element | JQuery;

    offset?: object;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export default class dxValidationMessage extends dxOverlay {
    constructor(element: Element, options?: dxValidationMessageOptions)
    constructor(element: JQuery, options?: dxValidationMessageOptions)
}

declare global {
interface JQuery {
    dxValidationMessage(): JQuery;
    dxValidationMessage(options: "instance"): dxValidationMessage;
    dxValidationMessage(options: string): any;
    dxValidationMessage(options: string, ...params: any[]): any;
    dxValidationMessage(options: dxValidationMessageOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxValidationMessageOptions;
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxValidationMessageOptions;
