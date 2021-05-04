/**
* DevExtreme (viz/export.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import DOMComponent from '../core/dom_component';



/**
 * Allows you to export UI components using their SVG markup.
 */
export function exportFromMarkup(markup: string, options: { fileName?: string, format?: string, backgroundColor?: string, proxyUrl?: string, width?: number, height?: number, onExporting?: Function, onExported?: Function, onFileSaving?: Function, margin?: number, svgToCanvas?: Function }): void;

/**
 * Exports one or several UI components to PNG.
 */
export function exportWidgets(widgetInstances: Array<Array<DOMComponent>>): void;

/**
 * Exports one or several UI components.
 */
export function exportWidgets(widgetInstances: Array<Array<DOMComponent>>, options: { fileName?: string, format?: 'GIF' | 'JPEG' | 'PDF' | 'PNG' | 'SVG', backgroundColor?: string, margin?: number, gridLayout?: boolean, verticalAlignment?: 'bottom' | 'center' | 'top', horizontalAlignment?: 'center' | 'left' | 'right', proxyUrl?: string, onExporting?: Function, onExported?: Function, onFileSaving?: Function, svgToCanvas?: Function }): void;

/**
 * Gets the SVG markup of specific UI components for their subsequent export.
 */
export function getMarkup(widgetInstances: Array<DOMComponent>): string;