/**
* DevExtreme (viz/core/base_widget.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import '../../jquery_augmentation';

import DOMComponent, {
    DOMComponentOptions
} from '../../core/dom_component';

import {
    dxElement
} from '../../core/element';

import {
    format
} from '../../ui/widget/ui.widget';

import {
    DashStyleType
} from '../common';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type WordWrapType = 'normal' | 'breakWord' | 'none';
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type VizTextOverflowType = 'ellipsis' | 'hide' | 'none';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface BaseWidgetOptions<T = BaseWidget> extends DOMComponentOptions<T> {
    /**
     * Specifies whether the UI component responds to user interaction.
     */
    disabled?: boolean;
    /**
     * Configures the exporting and printing features.
     */
    export?: BaseWidgetExport;
    /**
     * Configures the loading indicator.
     */
    loadingIndicator?: BaseWidgetLoadingIndicator;
    /**
     * Generates space around the UI component.
     */
    margin?: BaseWidgetMargin;
    /**
     * A function that is executed when the UI component's rendering has finished.
     */
    onDrawn?: ((e: { component?: T, element?: dxElement, model?: any }) => any);
    /**
     * A function that is executed after the UI component is exported.
     */
    onExported?: ((e: { component?: T, element?: dxElement, model?: any }) => any);
    /**
     * A function that is executed before the UI component is exported.
     */
    onExporting?: ((e: { component?: T, element?: dxElement, model?: any, fileName?: string, cancel?: boolean, format?: string }) => any);
    /**
     * A function that is executed before a file with exported UI component is saved to the user's local storage.
     */
    onFileSaving?: ((e: { component?: T, element?: dxElement, fileName?: string, format?: string, data?: Blob, cancel?: boolean }) => any);
    /**
     * A function that is executed when an error or warning occurs.
     */
    onIncidentOccurred?: ((e: { component?: T, element?: dxElement, model?: any, target?: any }) => any);
    /**
     * Notifies the UI component that it is embedded into an HTML page that uses a tag modifying the path.
     */
    pathModified?: boolean;
    /**
     * Specifies whether to redraw the UI component when the size of the parent browser window changes or a mobile device rotates.
     */
    redrawOnResize?: boolean;
    /**
     * Switches the UI component to a right-to-left representation.
     */
    rtlEnabled?: boolean;
    /**
     * Specifies the UI component's size in pixels.
     */
    size?: BaseWidgetSize;
    /**
     * Sets the name of the theme the UI component uses.
     */
    theme?: 'generic.dark' | 'generic.light' | 'generic.contrast' | 'generic.carmine' | 'generic.darkmoon' | 'generic.darkviolet' | 'generic.greenmist' | 'generic.softblue' | 'material.blue.light' | 'material.lime.light' | 'material.orange.light' | 'material.purple.light' | 'material.teal.light';
    /**
     * Configures the UI component's title.
     */
    title?: BaseWidgetTitle | string;
    /**
     * Configures tooltips - small pop-up rectangles that display information about a data-visualizing UI component element being pressed or hovered over with the mouse pointer.
     */
    tooltip?: BaseWidgetTooltip;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface BaseWidgetExport {
    /**
     * Specifies the color that will fill transparent regions in the resulting file or document.
     */
    backgroundColor?: string;
    /**
     * Enables the client-side exporting in the UI component.
     */
    enabled?: boolean;
    /**
     * Specifies a default name for the file to which the UI component will be exported.
     */
    fileName?: string;
    /**
     * Specifies a set of export formats.
     */
    formats?: Array<'GIF' | 'JPEG' | 'PDF' | 'PNG' | 'SVG'>;
    /**
     * Adds an empty space around the exported UI component; measured in pixels.
     */
    margin?: number;
    /**
     * Enables the printing feature in the UI component. Applies only if the export.enabled property is true.
     */
    printingEnabled?: boolean;
    /**
     * Specifies the URL of the server-side proxy that streams the resulting file to the end user to enable exporting in the Safari browser.
     * @deprecated Since v10, Safari browser supports API for saving files, and this property is no longer required.
     */
    proxyUrl?: string;
    /**
     * A function that renders SVG markup on the HTML canvas. Required to export custom SVG elements (for example, markerTemplate).
     */
    svgToCanvas?: ((svg: SVGElement, canvas: HTMLCanvasElement) => Promise<void> | JQueryPromise<void>);
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface BaseWidgetLoadingIndicator {
    /**
     * Colors the background of the loading indicator.
     */
    backgroundColor?: string;
    /**
     * Specifies whether the loading indicator should be displayed and hidden automatically.
     */
    enabled?: boolean;
    /**
     * Specifies font properties for the loading indicator.
     */
    font?: Font;
    /**
     * Allows you to change the loading indicator's visibility.
     */
    show?: boolean;
    /**
     * Specifies the text to be displayed by the loading indicator.
     */
    text?: string;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface BaseWidgetMargin {
    /**
     * Specifies the bottom margin of the UI component in pixels.
     */
    bottom?: number;
    /**
     * Specifies the left margin of the UI component in pixels.
     */
    left?: number;
    /**
     * Specifies the right margin of the UI component in pixels.
     */
    right?: number;
    /**
     * Specifies the top margin of the UI component in pixels.
     */
    top?: number;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface BaseWidgetSize {
    /**
     * Specifies the height of the UI component in pixels.
     */
    height?: number;
    /**
     * Specifies the width of the UI component in pixels.
     */
    width?: number;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface BaseWidgetTitle {
    /**
     * Specifies font properties for the title.
     */
    font?: Font;
    /**
     * Specifies the title's alignment in a horizontal direction.
     */
    horizontalAlignment?: 'center' | 'left' | 'right';
    /**
     * Generates space around the title.
     */
    margin?: number | { bottom?: number, left?: number, right?: number, top?: number };
    /**
     * Reserves a pixel-measured space for the title.
     */
    placeholderSize?: number;
    /**
     * Configures the UI component's subtitle.
     */
    subtitle?: { font?: Font, offset?: number, text?: string, textOverflow?: VizTextOverflowType, wordWrap?: WordWrapType } | string;
    /**
     * Specifies the title's text.
     */
    text?: string;
    /**
     * Specifies what to do with the title when it overflows the allocated space after applying wordWrap: hide, truncate it and display an ellipsis, or do nothing.
     */
    textOverflow?: VizTextOverflowType;
    /**
     * Specifies the title's alignment in a vertical direction.
     */
    verticalAlignment?: 'bottom' | 'top';
    /**
     * Specifies how to wrap the title if it does not fit into a single line.
     */
    wordWrap?: WordWrapType;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface BaseWidgetTooltip {
    /**
     * Specifies the length of a tooltip's arrow in pixels.
     */
    arrowLength?: number;
    /**
     * Configures a tooltip's border.
     */
    border?: { color?: string, dashStyle?: DashStyleType, opacity?: number, visible?: boolean, width?: number };
    /**
     * Colors all tooltips.
     */
    color?: string;
    /**
     * Specifies the container in which to draw tooltips. The default container is the HTML DOM `` element.
     */
    container?: string | Element | JQuery;
    /**
     * Makes all the tooltip's corners rounded.
     */
    cornerRadius?: number;
    /**
     * Enables tooltips.
     */
    enabled?: boolean;
    /**
     * Specifies tooltips' font properties.
     */
    font?: Font;
    /**
     * Formats a value before it is displayed it in a tooltip.
     */
    format?: format;
    /**
     * Specifies tooltips' transparency.
     */
    opacity?: number;
    /**
     * Generates an empty space, measured in pixels, between a tooltip's left/right border and its text.
     */
    paddingLeftRight?: number;
    /**
     * Generates an empty space, measured in pixels, between a tooltip's top/bottom border and its text.
     */
    paddingTopBottom?: number;
    /**
     * Configures a tooltip's shadow.
     */
    shadow?: { blur?: number, color?: string, offsetX?: number, offsetY?: number, opacity?: number };
    /**
     * Specifies a tooltip's z-index.
     */
    zIndex?: number;
}
/**
 * This section describes properties and methods that are common to all UI components.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export default class BaseWidget extends DOMComponent {
    constructor(element: Element, options?: BaseWidgetOptions)
    constructor(element: JQuery, options?: BaseWidgetOptions)
    /**
     * Exports the UI component.
     */
    exportTo(fileName: string, format: string): void;
    /**
     * Gets the current UI component size.
     */
    getSize(): BaseWidgetSize;
    /**
     * Hides the loading indicator.
     */
    hideLoadingIndicator(): void;
    /**
     * Opens the browser's print window.
     */
    print(): void;
    /**
     * Redraws the UI component.
     */
    render(): void;
    /**
     * Shows the loading indicator.
     */
    showLoadingIndicator(): void;
    /**
     * Gets the UI component's SVG markup.
     */
    svg(): string;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface Font {
    /**
     * Specifies font color.
     */
    color?: string;
    /**
     * Specifies font family.
     */
    family?: string;
    /**
     * Specifies font opacity.
     */
    opacity?: number;
    /**
     * Specifies font size.
     */
    size?: string | number;
    /**
     * Specifies font weight. Accepts values from 100 to 900 in increments of 100. Higher values increase boldness.
     */
    weight?: number;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface BaseWidgetAnnotationConfig {
    /**
     * Specifies whether users can drag and drop the annotation.
     */
    allowDragging?: boolean;
    /**
     * Specifies the length of the annotation's arrow in pixels.
     */
    arrowLength?: number;
    /**
     * Specifies the width of the annotation's arrow at its junction with the annotation rectangle.
     */
    arrowWidth?: number;
    /**
     * Configures the appearance of the annotation's border.
     */
    border?: { color?: string, cornerRadius?: number, dashStyle?: DashStyleType, opacity?: number, visible?: boolean, width?: number };
    /**
     * Specifies the color that fills the annotation.
     */
    color?: string;
    /**
     * A container for custom data.
     */
    data?: any;
    /**
     * Specifies the annotation's description in the tooltip.
     */
    description?: string;
    /**
     * Specifies the annotation's font properties. Applies to text annotations only.
     */
    font?: Font;
    /**
     * Specifies the annotation's height in pixels.
     */
    height?: number;
    /**
     * Configures the image to be displayed in the annotation. Applies only if the type is 'image'.
     */
    image?: string | { height?: number, url?: string, width?: number };
    /**
     * Moves the annotation horizontally.
     */
    offsetX?: number;
    /**
     * Moves the annotation vertically.
     */
    offsetY?: number;
    /**
     * Specifies the annotation's opacity.
     */
    opacity?: number;
    /**
     * Used with paddingTopBottom to generate an empty space around the annotation's text or image (specified in pixels).
     */
    paddingLeftRight?: number;
    /**
     * Along with paddingLeftRight, generates an empty space around the annotation's text or image; specified in pixels.
     */
    paddingTopBottom?: number;
    /**
     * Configures the annotation's shadows.
     */
    shadow?: { blur?: number, color?: string, offsetX?: number, offsetY?: number, opacity?: number };
    /**
     * Specifies the annotation's text. Applies only if the type is 'text'.
     */
    text?: string;
    /**
     * Specifies what to do with the annotation's text when it overflows the allocated space after applying wordWrap: hide, truncate it and display an ellipsis, or do nothing.
     */
    textOverflow?: VizTextOverflowType;
    /**
     * Specifies whether the annotation tooltip is enabled.
     */
    tooltipEnabled?: boolean;
    /**
     * Specifies whether the annotation displays text, an image, or a template. This is a required setting.
     */
    type?: 'text' | 'image' | 'custom';
    /**
     * Specifies the annotation's width in pixels.
     */
    width?: number;
    /**
     * Specifies how to wrap the annotation's text if it does not fit into a single line.
     */
    wordWrap?: WordWrapType;
    /**
     * Used with y to position the annotation's center at a specific pixel coordinate. (0, 0) is the upper left corner of the UI component.
     */
    x?: number;
    /**
     * Used with x to position the annotation's center at a specific pixel coordinate. (0, 0) is the upper left corner of the UI component.
     */
    y?: number;
}