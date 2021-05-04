/**
* DevExtreme (animation/position.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface positionConfig {
    /**
     * Specifies the target element's side or corner where the overlay element should be positioned.
     */
    at?: 'bottom' | 'center' | 'left' | 'left bottom' | 'left top' | 'right' | 'right bottom' | 'right top' | 'top' | { x?: 'center' | 'left' | 'right', y?: 'bottom' | 'center' | 'top' };
    /**
     * A boundary element in which the overlay element must be positioned.
     */
    boundary?: string | Element | JQuery | Window;
    /**
     * Specifies the offset of boundaries from the boundary element.
     */
    boundaryOffset?: string | { x?: number, y?: number };
    /**
     * Specifies how to resolve collisions - when the overlay element exceeds the boundary element.
     */
    collision?: 'fit' | 'fit flip' | 'fit flipfit' | 'fit none' | 'flip' | 'flip fit' | 'flip none' | 'flipfit' | 'flipfit fit' | 'flipfit none' | 'none' | 'none fit' | 'none flip' | 'none flipfit' | { x?: 'fit' | 'flip' | 'flipfit' | 'none', y?: 'fit' | 'flip' | 'flipfit' | 'none' };
    /**
     * Specifies the overlay element's side or corner to align with a target element.
     */
    my?: 'bottom' | 'center' | 'left' | 'left bottom' | 'left top' | 'right' | 'right bottom' | 'right top' | 'top' | { x?: 'center' | 'left' | 'right', y?: 'bottom' | 'center' | 'top' };
    /**
     * The target element relative to which the overlay element should be positioned.
     */
    of?: string | Element | JQuery | Window;
    /**
     * Specifies the overlay element's offset from a specified position.
     */
    offset?: string | { x?: number, y?: number };
}
