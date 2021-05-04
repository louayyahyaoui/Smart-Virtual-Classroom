/*!
 * devextreme-react
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file in the root of the project for details.
 *
 * https://github.com/DevExpress/devextreme-react
 */

import dxScrollView, { IOptions } from "devextreme/ui/scroll_view";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
interface IScrollViewOptions extends IOptions, IHtmlOptions {
}
declare class ScrollView extends BaseComponent<IScrollViewOptions> {
    get instance(): dxScrollView;
    protected _WidgetClass: typeof dxScrollView;
    protected independentEvents: string[];
}
export default ScrollView;
export { ScrollView, IScrollViewOptions };
