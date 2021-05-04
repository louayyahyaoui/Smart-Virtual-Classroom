/**
* DevExtreme (animation/presets.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    Device
} from '../core/devices';

import {
    animationConfig
} from './fx';

/**
 * A repository of animations.
 */
export default class animationPresets {
    /**
     * Applies the changes made in the animation repository.
     */
    applyChanges(): void;
    /**
     * Removes all animations from the repository.
     */
    clear(): void;
    /**
     * Deletes an animation with a specific name.
     */
    clear(name: string): void;
    /**
     * Gets the configuration of an animation with a specific name.
     */
    getPreset(name: string): any;
    /**
     * Registers predefined animations in the animation repository.
     */
    registerDefaultPresets(): void;
    /**
     * Adds an animation with a specific name to the animation repository.
     */
    registerPreset(name: string, config: { animation?: animationConfig, device?: Device }): void;
    /**
     * Deletes all custom animations.
     */
    resetToDefaults(): void;
}
