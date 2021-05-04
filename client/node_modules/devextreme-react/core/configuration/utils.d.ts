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

export declare function mergeNameParts(...args: string[]): string;
export declare function parseOptionName(name: string): IOptionInfo | ICollectionOptionInfo;
interface IOptionInfo {
    isCollectionItem: false;
    name: string;
}
interface ICollectionOptionInfo {
    isCollectionItem: true;
    name: string;
    index: number;
}
export {};
