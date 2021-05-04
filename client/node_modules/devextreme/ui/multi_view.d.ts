/**
* DevExtreme (ui/multi_view.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import DataSource, {
    DataSourceOptions
} from '../data/data_source';

import CollectionWidget, {
    CollectionWidgetItem,
    CollectionWidgetOptions
} from './collection/ui.collection_widget.base';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxMultiViewOptions<T = dxMultiView> extends CollectionWidgetOptions<T> {
    /**
     * Specifies whether or not to animate the displayed item change.
     */
    animationEnabled?: boolean;
    /**
     * Binds the UI component to data.
     */
    dataSource?: string | Array<string | dxMultiViewItem | any> | DataSource | DataSourceOptions;
    /**
     * Specifies whether to render the view's content when it is displayed. If false, the content is rendered immediately.
     */
    deferRendering?: boolean;
    /**
     * Specifies whether the UI component can be focused using keyboard navigation.
     */
    focusStateEnabled?: boolean;
    /**
     * An array of items displayed by the UI component.
     */
    items?: Array<string | dxMultiViewItem | any>;
    /**
     * A Boolean value specifying whether or not to scroll back to the first item after the last item is swiped.
     */
    loop?: boolean;
    /**
     * The index of the currently displayed item.
     */
    selectedIndex?: number;
    /**
     * A Boolean value specifying whether or not to allow users to change the selected index by swiping.
     */
    swipeEnabled?: boolean;
}
/**
 * The MultiView is a UI component that contains several views. An end user navigates through the views by swiping them in the horizontal direction.
 */
export default class dxMultiView extends CollectionWidget {
    constructor(element: Element, options?: dxMultiViewOptions)
    constructor(element: JQuery, options?: dxMultiViewOptions)
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxMultiViewItem extends CollectionWidgetItem {
}

declare global {
interface JQuery {
    dxMultiView(): JQuery;
    dxMultiView(options: "instance"): dxMultiView;
    dxMultiView(options: string): any;
    dxMultiView(options: string, ...params: any[]): any;
    dxMultiView(options: dxMultiViewOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxMultiViewOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxMultiViewOptions;