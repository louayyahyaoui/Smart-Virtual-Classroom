/**
* DevExtreme (ui/themes.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * An object that serves as a namespace for the methods that work with DevExtreme CSS Themes.
 */
export default class themes {
    /**
     * Gets the current theme's name.
     */
    static current(): string;
    /**
     * Sets a theme with a specific name.
     */
    static current(themeName: string): void;
    /**
     * Specifies a function to be executed after the theme is loaded.
     */
    static ready(callback: Function): void;
    /**
     * 
     */
    static initialized(callback: Function): void;
    static isMaterial(theme: string): boolean;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export function current(): string;
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export function isMaterial(theme: string): boolean;
