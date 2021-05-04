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
interface ITemplateMeta {
    tmplOption: string;
    component: string;
    render: string;
    keyFn: string;
}
interface ITemplateProps {
    name: string;
    component?: any;
    render?: any;
    children?: any;
    keyFn?: (data: any) => string;
}
interface ITemplateArgs {
    data: any;
    index?: number;
}
declare class Template extends React.PureComponent<ITemplateProps, any> {
    render(): React.ReactNode;
}
declare function findProps(child: React.ReactElement<any>): ITemplateProps | undefined;
export { ITemplateMeta, ITemplateProps, ITemplateArgs, Template, findProps, };
