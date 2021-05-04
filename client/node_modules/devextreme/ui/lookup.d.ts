/**
* DevExtreme (ui/lookup.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    animationConfig
} from '../animation/fx';

import {
    positionConfig
} from '../animation/position';

import '../jquery_augmentation';

import {
    dxElement
} from '../core/element';

import {
    template
} from '../core/templates/template';

import {
    event
} from '../events/index';

import dxDropDownList, {
    dxDropDownListOptions
} from './drop_down_editor/ui.drop_down_list';

import {
    dxPopoverOptions
} from './popover';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxLookupOptions extends dxDropDownListOptions<dxLookup> {
    /**
     * Configures UI component visibility animations. This object contains two fields: show and hide.
     * @deprecated Use the dropDownOptions option instead.
     */
    animation?: { hide?: animationConfig, show?: animationConfig };
    /**
     * The text displayed on the Apply button.
     */
    applyButtonText?: string;
    /**
     * Specifies the way an end-user applies the selected value.
     */
    applyValueMode?: 'instantly' | 'useButtons';
    /**
     * The text displayed on the Cancel button.
     */
    cancelButtonText?: string;
    /**
     * Specifies whether or not the UI component cleans the search box when the popup window is displayed.
     */
    cleanSearchOnOpening?: boolean;
    /**
     * The text displayed on the Clear button.
     */
    clearButtonText?: string;
    /**
     * Specifies whether to close the drop-down menu if a user clicks outside it.
     * @deprecated Use the dropDownOptions option instead.
     */
    closeOnOutsideClick?: boolean | (() => boolean);
    /**
     * Specifies a custom template for the input field.
     */
    fieldTemplate?: template | ((selectedItem: any, fieldElement: dxElement) => string | Element | JQuery);
    /**
     * Specifies whether the UI component can be focused using keyboard navigation.
     */
    focusStateEnabled?: boolean;
    /**
     * A Boolean value specifying whether or not to display the lookup in full-screen mode.
     * @deprecated Use the dropDownOptions option instead.
     */
    fullScreen?: boolean;
    /**
     * Specifies a custom template for group captions.
     */
    groupTemplate?: template | ((itemData: any, itemIndex: number, itemElement: dxElement) => string | Element | JQuery);
    /**
     * A Boolean value specifying whether or not to group UI component items.
     */
    grouped?: boolean;
    /**
     * The text displayed on the button used to load the next page from the data source.
     */
    nextButtonText?: string;
    /**
     * A function that is executed before the next page is loaded.
     */
    onPageLoading?: ((e: { component?: dxLookup, element?: dxElement, model?: any }) => any);
    /**
     * A function that is executed when the 'pull to refresh' gesture is performed on the drop-down item list. Supported in mobile themes only.
     */
    onPullRefresh?: ((e: { component?: dxLookup, element?: dxElement, model?: any }) => any);
    /**
     * A function that is executed on each scroll gesture performed on the drop-down item list.
     */
    onScroll?: ((e: { component?: dxLookup, element?: dxElement, model?: any, event?: event, scrollOffset?: any, reachedLeft?: boolean, reachedRight?: boolean, reachedTop?: boolean, reachedBottom?: boolean }) => any);
    /**
     * A function that is executed when the drop-down list's title is rendered.
     * @deprecated Use the dropDownOptions option instead.
     */
    onTitleRendered?: ((e: { component?: dxLookup, element?: dxElement, model?: any, titleElement?: dxElement }) => any);
    /**
     * A function that is executed after the UI component's value is changed.
     */
    onValueChanged?: ((e: { component?: dxLookup, element?: dxElement, model?: any, value?: any, previousValue?: any, event?: event }) => any);
    /**
     * Specifies whether the next page is loaded when a user scrolls the UI component to the bottom or when the 'next' button is clicked.
     */
    pageLoadMode?: 'nextButton' | 'scrollBottom';
    /**
     * Specifies the text shown in the pullDown panel, which is displayed when the UI component is scrolled to the bottom.
     */
    pageLoadingText?: string;
    /**
     * The text displayed by the UI component when nothing is selected.
     */
    placeholder?: string;
    /**
     * Specifies the popup element's height. Applies only if fullScreen is false.
     * @deprecated Use the dropDownOptions option instead.
     */
    popupHeight?: number | string | (() => number | string);
    /**
     * Specifies the popup element's width. Applies only if fullScreen is false.
     * @deprecated Use the dropDownOptions option instead.
     */
    popupWidth?: number | string | (() => number | string);
    /**
     * An object defining UI component positioning properties.
     * @deprecated Use the dropDownOptions option instead.
     */
    position?: positionConfig;
    /**
     * A Boolean value specifying whether or not the UI component supports the 'pull down to refresh' gesture.
     */
    pullRefreshEnabled?: boolean;
    /**
     * Specifies the text displayed in the pullDown panel when the UI component is pulled below the refresh threshold.
     */
    pulledDownText?: string;
    /**
     * Specifies the text shown in the pullDown panel while the list is being pulled down to the refresh threshold.
     */
    pullingDownText?: string;
    /**
     * Specifies the text displayed in the pullDown panel while the UI component is being refreshed.
     */
    refreshingText?: string;
    /**
     * Specifies whether the search box is visible.
     */
    searchEnabled?: boolean;
    /**
     * The text that is provided as a hint in the lookup's search bar.
     */
    searchPlaceholder?: string;
    /**
     * Specifies whether to shade the container when the lookup is active. Applies only if usePopover is false.
     * @deprecated Use the dropDownOptions option instead.
     */
    shading?: boolean;
    /**
     * Specifies whether to display the Cancel button in the lookup window.
     */
    showCancelButton?: boolean;
    /**
     * Specifies whether to display the Clear button in the lookup window.
     */
    showClearButton?: boolean;
    /**
     * A Boolean value specifying whether or not to display the title in the popup window.
     * @deprecated Use the dropDownOptions option instead.
     */
    showPopupTitle?: boolean;
    /**
     * The title of the lookup window.
     * @deprecated Use the dropDownOptions option instead.
     */
    title?: string;
    /**
     * Specifies a custom template for the title.
     * @deprecated Use the dropDownOptions option instead.
     */
    titleTemplate?: template | ((titleElement: dxElement) => string | Element | JQuery);
    /**
     * Specifies whether or not the UI component uses native scrolling.
     */
    useNativeScrolling?: boolean;
    /**
     * Specifies whether to show lookup contents in the Popover UI component.
     */
    usePopover?: boolean;
    /**
     * Specifies whether to vertically align the drop-down menu so that the selected item is in its center. Applies only in Material Design themes.
     */
    dropDownCentered?: boolean;
    /**
     * 
     * Warning! This type is used for internal purposes. Do not import it directly.
     */
    dropDownOptions?: dxPopoverOptions;

}
/**
 * The Lookup is a UI component that allows an end user to search for an item in a collection shown in a drop-down menu.
 */
export default class dxLookup extends dxDropDownList {
    constructor(element: Element, options?: dxLookupOptions)
    constructor(element: JQuery, options?: dxLookupOptions)
}

declare global {
interface JQuery {
    dxLookup(): JQuery;
    dxLookup(options: "instance"): dxLookup;
    dxLookup(options: string): any;
    dxLookup(options: string, ...params: any[]): any;
    dxLookup(options: dxLookupOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxLookupOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxLookupOptions;
