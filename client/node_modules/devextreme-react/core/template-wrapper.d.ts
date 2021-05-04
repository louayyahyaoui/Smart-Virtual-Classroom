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
interface ITemplateWrapperProps {
    content: any;
    container: Element;
    onRemoved: () => void;
    onRendered?: () => void;
    key: string;
}
interface ITemplateWrapperState {
    removalListenerRequired: boolean;
}
declare type TemplateWrapperRenderer = () => TemplateWrapper;
declare class TemplateWrapper extends React.PureComponent<ITemplateWrapperProps, ITemplateWrapperState> {
    private readonly _removalListenerRef;
    constructor(props: ITemplateWrapperProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    private get _listenerElement();
    private _subscribeOnRemove;
    private _subscribeOnElementRemoval;
    private _onDxRemove;
    render(): React.ReactNode;
}
export { ITemplateWrapperProps, TemplateWrapper, TemplateWrapperRenderer, };
