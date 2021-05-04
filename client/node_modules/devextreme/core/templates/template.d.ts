/**
* DevExtreme (core/templates/template.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxTemplateOptions {
    /**
     * Specifies the name of the template.
     */
    name?: string;
}
/**
 * A custom template's markup.
 */
export type dxTemplate = Template;
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export class Template {
    constructor(options?: dxTemplateOptions)
}

/**
 * A template notation used to specify templates for UI component elements.
 */
export type template = string | Function | Element | JQuery;
