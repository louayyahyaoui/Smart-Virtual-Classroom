/**
* DevExtreme (core/devices.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface Device {
    /**
     * Indicates whether or not the device platform is Android.
     */
    android?: boolean;
    /**
     * Specifies the type of the device on which the application is running.
     */
    deviceType?: 'phone' | 'tablet' | 'desktop';
    /**
     * Indicates whether or not the device platform is generic, which means that the application will look and behave according to a generic 'light' or 'dark' theme.
     */
    generic?: boolean;
    /**
     * Specifies a performance grade of the current device.
     */
    grade?: 'A' | 'B' | 'C';
    /**
     * Indicates whether or not the device platform is iOS.
     */
    ios?: boolean;
    /**
     * Indicates whether or not the device type is 'phone'.
     */
    phone?: boolean;
    /**
     * Specifies the platform of the device on which the application is running.
     */
    platform?: 'android' | 'ios' | 'generic';
    /**
     * Indicates whether or not the device type is 'tablet'.
     */
    tablet?: boolean;
    /**
     * Specifies an array with the major and minor versions of the device platform.
     */
    version?: Array<number>;
}

/**
 * An object that serves as a namespace for the methods and events specifying information on the current device.
 */
declare class DevicesObject {
    constructor(options: { window?: Window });
    /**
     * Gets information on the current device.
     */
    current(): Device;
    /**
     * Overrides actual device information to force the application to operate as if it was running on a specified device.
     */
    current(deviceName: string | Device): void;
    /**
     * 
     */
    off(eventName: string): this;
    /**
     * 
     */
    off(eventName: string, eventHandler: Function): this;
    /**
     * 
     */
    on(eventName: string, eventHandler: Function): this;
    /**
     * 
     */
    on(events: any): this;
    /**
     * Returns the current device orientation.
     */
    orientation(): string;
    /**
     * Returns real information about the current device regardless of the value passed to the DevExpress.devices.current(deviceName) method.
     */
    real(): Device;
    isSimulator(): boolean;
}

/**
 * 
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
declare const devices: DevicesObject;
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export default devices;
