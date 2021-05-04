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

/// <reference types="react" />
import dxSlideOutView, { IOptions } from "devextreme/ui/slide_out_view";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
interface ISlideOutViewOptions extends IOptions, IHtmlOptions {
    contentRender?: (...params: any) => React.ReactNode;
    contentComponent?: React.ComponentType<any>;
    contentKeyFn?: (data: any) => string;
    menuRender?: (...params: any) => React.ReactNode;
    menuComponent?: React.ComponentType<any>;
    menuKeyFn?: (data: any) => string;
}
declare class SlideOutView extends BaseComponent<ISlideOutViewOptions> {
    get instance(): dxSlideOutView;
    protected _WidgetClass: typeof dxSlideOutView;
    protected independentEvents: string[];
    protected _templateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
export default SlideOutView;
export { SlideOutView, ISlideOutViewOptions };
