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

import { ITemplateArgs } from './template';
import { TemplatesStore } from './templates-store';
interface IDxTemplate {
    render: (data: IDxTemplateData) => any;
}
interface IDxTemplateData {
    container: any;
    model?: any;
    index?: any;
    onRendered?: () => void;
}
declare function createDxTemplate(createContentProvider: () => (props: ITemplateArgs) => any, templatesStore: TemplatesStore, keyFn?: (data: any) => string): IDxTemplate;
export { IDxTemplate, createDxTemplate, };
