/**
* DevExtreme (renovation/viz/core/renderers/types.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type PathType = 'line'|'area'|'bezier'|'bezierarea';
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type LineCap = 'square'|'butt'|'round'|'inherit';
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface Point { x: number; y: number }
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Segment = [string, number?, number?, number?, number?, number?, number?];
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type LabelAlignment = 'center'|'left'|'right';
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type SharpDirection = 'forward'|'backward';
