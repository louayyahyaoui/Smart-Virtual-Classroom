/**
* DevExtreme (ui/pivot_grid_field_chooser.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import '../jquery_augmentation';

import {
    dxElement
} from '../core/element';

import {
    event
} from '../events/index';

import PivotGridDataSource, {
    PivotGridDataSourceField
} from './pivot_grid/data_source';

import Widget, {
    WidgetOptions
} from './widget/ui.widget';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPivotGridFieldChooserOptions extends WidgetOptions<dxPivotGridFieldChooser> {
    /**
     * Specifies whether the field chooser allows searching in the 'All Fields' section.
     */
    allowSearch?: boolean;
    /**
     * Specifies when to apply changes made in the UI component to the PivotGrid.
     */
    applyChangesMode?: 'instantly' | 'onDemand';
    /**
     * The data source of a PivotGrid UI component.
     */
    dataSource?: PivotGridDataSource;
    /**
     * Configures the header filter feature.
     */
    headerFilter?: { allowSearch?: boolean, height?: number, searchTimeout?: number, showRelevantValues?: boolean, texts?: { cancel?: string, emptyValue?: string, ok?: string }, width?: number };
    /**
     * Specifies the UI component's height.
     */
    height?: number | string | (() => number | string);
    /**
     * Specifies the field chooser layout.
     */
    layout?: 0 | 1 | 2;
    /**
     * A function that is executed before the context menu is rendered.
     */
    onContextMenuPreparing?: ((e: { component?: dxPivotGridFieldChooser, element?: dxElement, model?: any, items?: Array<any>, area?: string, field?: PivotGridDataSourceField, event?: event }) => any);
    /**
     * Specifies a delay in milliseconds between when a user finishes typing in the field chooser's search panel, and when the search is executed.
     */
    searchTimeout?: number;
    /**
     * The UI component's state.
     */
    state?: any;
    /**
     * Strings that can be changed or localized in the PivotGridFieldChooser UI component.
     */
    texts?: { allFields?: string, columnFields?: string, dataFields?: string, filterFields?: string, rowFields?: string };
}
/**
 * A complementary UI component for the PivotGrid that allows you to manage data displayed in the PivotGrid. The field chooser is already integrated in the PivotGrid and can be invoked using the context menu. If you need to continuously display the field chooser near the PivotGrid UI component, use the PivotGridFieldChooser UI component.
 */
export default class dxPivotGridFieldChooser extends Widget {
    constructor(element: Element, options?: dxPivotGridFieldChooserOptions)
    constructor(element: JQuery, options?: dxPivotGridFieldChooserOptions)
    /**
     * Applies changes made in the UI component to the PivotGrid. Takes effect only if applyChangesMode is 'onDemand'.
     */
    applyChanges(): void;
    /**
     * Cancels changes made in the UI component without applying them to the PivotGrid. Takes effect only if applyChangesMode is 'onDemand'.
     */
    cancelChanges(): void;
    /**
     * Gets the PivotGridDataSource instance.
     */
    getDataSource(): PivotGridDataSource;
    /**
     * Updates the UI component to the size of its content.
     */
    updateDimensions(): void;
}

declare global {
interface JQuery {
    dxPivotGridFieldChooser(): JQuery;
    dxPivotGridFieldChooser(options: "instance"): dxPivotGridFieldChooser;
    dxPivotGridFieldChooser(options: string): any;
    dxPivotGridFieldChooser(options: string, ...params: any[]): any;
    dxPivotGridFieldChooser(options: dxPivotGridFieldChooserOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxPivotGridFieldChooserOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxPivotGridFieldChooserOptions;
