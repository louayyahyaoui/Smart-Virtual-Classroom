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

import { ITemplateMeta } from '../../template';
import { IExpectedChild, IOptionElement } from './element';
import { IConfigNode, ITemplate } from '../config-node';
interface IWidgetDescriptor {
    templates: ITemplateMeta[];
    initialValuesProps: Record<string, string>;
    predefinedValuesProps: Record<string, any>;
    expectedChildren: Record<string, IExpectedChild>;
}
export declare function processChildren(parentElement: IOptionElement, parentFullName: string): {
    configs: Record<string, IConfigNode>;
    configCollections: Record<string, IConfigNode[]>;
    templates: ITemplate[];
    hasTranscludedContent: boolean;
};
declare function buildConfigTree(widgetDescriptor: IWidgetDescriptor, props: Record<string, any>): IConfigNode;
export { buildConfigTree, };
