/**
* DevExtreme (core/config.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    positionConfig
} from '../animation/position';

/**
 * Gets the current global configuration.
 */
declare function config(): globalConfig;

/**
 * Configures your application before its launch.
 */
declare function config(config: globalConfig): void;

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface globalConfig {
    /**
     * A decimal separator. No longer applies.
     * @deprecated 
     */
    decimalSeparator?: string;
    /**
     * The default currency. Accepts a 3-letter ISO 4217 code.
     */
    defaultCurrency?: string;
    /**
     * Specifies how editors' text fields are styled in your application.
     */
    editorStylingMode?: 'outlined' | 'underlined' | 'filled';
    /**
     * Configures a Floating Action Button (FAB) that emits a stack of related actions (speed dial).
     */
    floatingActionButtonConfig?: { closeIcon?: string, direction?: 'auto' | 'up' | 'down', icon?: string, label?: string, maxSpeedDialActionCount?: number, position?: 'bottom' | 'center' | 'left' | 'left bottom' | 'left top' | 'right' | 'right bottom' | 'right top' | 'top' | positionConfig | Function, shading?: boolean };
    /**
     * Specifies whether dates are parsed and serialized according to the ISO 8601 standard in all browsers.
     */
    forceIsoDateParsing?: boolean;
    /**
     * Specifies whether to convert string values to lowercase in filter and search requests to OData services. Applies to the following operations: 'startswith', 'endswith', 'contains', and 'notcontains'.
     */
    oDataFilterToLower?: boolean;
    /**
     * Specifies whether the UI components support a right-to-left representation. Available for individual UI components as well.
     */
    rtlEnabled?: boolean;
    /**
     * The decimal separator that is used when submitting a value to the server.
     */
    serverDecimalSeparator?: string;
    /**
     * A group separator. No longer applies.
     * @deprecated 
     */
    thousandsSeparator?: string;
    /**
     * 
     */
    useLegacyStoreResult?: boolean;
    /**
     * 
     */
    useLegacyVisibleIndex?: boolean;
}


/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export default config;
