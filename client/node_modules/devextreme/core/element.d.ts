/**
* DevExtreme (core/element.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { dxElementWrapper } from '../core/renderer';
/**
 * 
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type dxElement = HTMLElement & JQuery;

/**
 * 
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type dxSVGElement = SVGElement & JQuery;

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export function getPublicElement(element: JQuery|dxElementWrapper): dxElement;
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export function setPublicElementWrapper(newStrategy: (element: JQuery|dxElementWrapper) => dxElement): void;
