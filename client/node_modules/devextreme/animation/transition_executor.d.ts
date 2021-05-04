/**
* DevExtreme (animation/transition_executor.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import '../jquery_augmentation';

import {
    animationConfig
} from './fx';

/**
 * The manager that performs several specified animations at a time.
 */
export default class TransitionExecutor {
    /**
     * Registers the set of elements that should be animated as 'entering' using the specified animation configuration.
     */
    enter(elements: JQuery, animation: animationConfig | string): void;
    /**
     * Registers a set of elements that should be animated as 'leaving' using the specified animation configuration.
     */
    leave(elements: JQuery, animation: animationConfig | string): void;
    /**
     * Deletes all the animations registered in the Transition Executor by using the enter(elements, animation) and leave(elements, animation) methods.
     */
    reset(): void;
    /**
     * Starts all the animations registered using the enter(elements, animation) and leave(elements, animation) methods beforehand.
     */
    start(): Promise<void> & JQueryPromise<void>;
    /**
     * Stops all started animations.
     */
    stop(): void;
}
