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

interface IConfigNode {
    readonly fullName: string;
    readonly predefinedOptions: Record<string, any>;
    readonly initialOptions: Record<string, any>;
    readonly options: Record<string, any>;
    readonly templates: ITemplate[];
    readonly configs: Record<string, IConfigNode>;
    readonly configCollections: Record<string, IConfigNode[]>;
}
interface ITemplate {
    optionName: string;
    isAnonymous: boolean;
    type: 'component' | 'render' | 'children';
    content: any;
    keyFn?: (data: any) => string;
}
export { IConfigNode, ITemplate, };
