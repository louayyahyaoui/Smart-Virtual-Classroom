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

import { ComponentBase, IHtmlOptions } from './component-base';
declare class Component<P> extends ComponentBase<P> {
    private _extensionCreators;
    constructor(props: P);
    componentDidMount(): void;
    protected renderChildren(): Record<string, unknown>[] | null | undefined;
    private _registerExtension;
    private _createExtensions;
}
export { Component, IHtmlOptions, };
