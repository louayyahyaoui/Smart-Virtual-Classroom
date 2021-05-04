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

import TemplatesManager from './templates-manager';
import { IConfigNode } from './configuration/config-node';
declare class OptionsManager {
    private readonly guards;
    private templatesManager;
    private instance;
    private isUpdating;
    private currentConfig;
    private subscribableOptions;
    private independentEvents;
    constructor(templatesManager: TemplatesManager);
    setInstance(instance: unknown, config: IConfigNode, subscribableOptions: string[], independentEvents: string[]): void;
    getInitialOptions(rootNode: IConfigNode): Record<string, unknown>;
    update(config: IConfigNode): void;
    onOptionChanged(e: {
        name: string;
        fullName: string;
        value: unknown;
    }): void;
    dispose(): void;
    private isOptionSubscribable;
    private isIndependentEvent;
    private callOptionChangeHandler;
    private wrapOptionValue;
    private setGuard;
    private resetOption;
    private setValue;
}
export { OptionsManager, };
