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

import * as React from 'react';
import { ITemplateMeta } from './template';
import { IExpectedChild } from './configuration/react/element';
declare const DX_REMOVE_EVENT = "dxremove";
interface IHtmlOptions {
    id?: string;
    className?: string;
    style?: any;
}
declare abstract class ComponentBase<P extends IHtmlOptions> extends React.PureComponent<P> {
    protected _WidgetClass: any;
    protected _instance: any;
    protected _element: HTMLDivElement;
    protected readonly _defaults: Record<string, string>;
    protected readonly _templateProps: ITemplateMeta[];
    protected readonly _expectedChildren: Record<string, IExpectedChild>;
    protected readonly subscribableOptions: string[];
    protected readonly independentEvents: string[];
    private _templatesRendererRef;
    private _templatesStore;
    private _templatesManager;
    private _optionsManager;
    private _useDeferUpdateForTemplates;
    constructor(props: P);
    componentDidMount(): void;
    componentDidUpdate(prevProps: P): void;
    componentWillUnmount(): void;
    protected _createWidget(element?: Element): void;
    private _getConfig;
    private _setTemplatesRendererRef;
    private _getElementProps;
    private _updateCssClasses;
    protected renderChildren(): React.ReactNode;
    render(): React.ReactNode;
}
export { IHtmlOptions, ComponentBase, DX_REMOVE_EVENT, };
