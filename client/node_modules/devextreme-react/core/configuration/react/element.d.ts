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
import { ITemplateMeta } from '../../template';
declare enum ElementType {
    Option = 0,
    Template = 1,
    Unknown = 2
}
interface IExpectedChild {
    optionName: string;
    isCollectionItem: boolean;
}
interface IOptionDescriptor {
    isCollection: boolean;
    name: string;
    templates: ITemplateMeta[];
    initialValuesProps: Record<string, string>;
    predefinedValuesProps: Record<string, any>;
    expectedChildren: Record<string, IExpectedChild>;
}
interface IOptionElement {
    type: ElementType.Option;
    descriptor: IOptionDescriptor;
    props: Record<string, any>;
}
interface ITemplateElement {
    type: ElementType.Template;
    props: Record<string, any>;
}
interface IUnknownElement {
    type: ElementType.Unknown;
}
declare type IElement = IOptionElement | ITemplateElement | IUnknownElement;
declare function getElementInfo(element: React.ReactNode, parentExpectedChildren?: Record<string, IExpectedChild>): IElement;
export { getElementInfo, ElementType, IElement, IOptionElement, IExpectedChild, };
