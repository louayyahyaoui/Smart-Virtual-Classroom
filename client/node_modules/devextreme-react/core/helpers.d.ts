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

export declare function generateID(): string;
export declare class DoubleKeyMap<TKey1, TKey2, TValue> {
    private readonly _map;
    set({ key1, key2 }: {
        key1: TKey1;
        key2: TKey2;
    }, value: TValue): void;
    get({ key1, key2 }: {
        key1: TKey1;
        key2: TKey2;
    }): TValue | undefined;
    delete({ key1, key2 }: {
        key1: TKey1;
        key2: TKey2;
    }): void;
}
export declare function capitalizeFirstLetter(text: string): string;
