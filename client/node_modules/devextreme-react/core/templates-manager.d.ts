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

import { ITemplate } from './configuration/config-node';
import { TemplatesStore } from './templates-store';
declare class TemplatesManager {
    private _templatesStore;
    private _templates;
    private _templatesContent;
    constructor(templatesStore: TemplatesStore);
    add(name: string, template: ITemplate): void;
    get templatesCount(): number;
    get templates(): Record<string, any>;
}
export default TemplatesManager;
