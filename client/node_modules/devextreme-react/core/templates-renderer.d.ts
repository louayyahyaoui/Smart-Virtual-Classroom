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
import { TemplatesStore } from './templates-store';
declare class TemplatesRenderer extends React.PureComponent<{
    templatesStore: TemplatesStore;
}> {
    private updateScheduled;
    private mounted;
    componentDidMount(): void;
    componentWillUnmount(): void;
    scheduleUpdate(useDeferUpdate: boolean): void;
    render(): React.ReactNode;
}
export { TemplatesRenderer, };
