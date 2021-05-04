/**
* DevExtreme (animation/fx.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import '../jquery_augmentation';

import {
    dxElement
} from '../core/element';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface animationConfig {
    /**
     * A function called after animation is completed.
     */
    complete?: (($element: dxElement, config: any) => any);
    /**
     * A number specifying wait time before animation execution.
     */
    delay?: number;
    /**
     * Specifies the animation direction for the 'slideIn' and 'slideOut' animation types.
     */
    direction?: 'bottom' | 'left' | 'right' | 'top';
    /**
     * A number specifying the time in milliseconds spent on animation.
     */
    duration?: number;
    /**
     * A string specifying the easing function for animation.
     */
    easing?: string;
    /**
     * Specifies the initial animation state.
     */
    from?: number | string | any;
    /**
     * A number specifying the time period to wait before the animation of the next stagger item starts.
     */
    staggerDelay?: number;
    /**
     * A function called before animation is started.
     */
    start?: (($element: dxElement, config: any) => any);
    /**
     * Specifies a final animation state.
     */
    to?: number | string | any;
    /**
     * A string value specifying the animation type.
     */
    type?: 'css' | 'fade' | 'fadeIn' | 'fadeOut' | 'pop' | 'slide' | 'slideIn' | 'slideOut';
}

declare const fx: {
    /**
     * Animates an element.
     */
    animate(element: Element, config: animationConfig): Promise<void> & JQueryPromise<void>;
    
    /**
     * Checks whether an element is being animated.
     */
    isAnimating(element: Element): boolean;
    
    /**
     * Stops an element's animation.
     */
    stop(element: Element, jumpToEnd: boolean): void;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export default fx;
