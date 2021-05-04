/**
* DevExtreme (viz/vector_map/projection.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface VectorMapProjectionConfig {
    /**
     * Specifies the projection's ratio of the width to the height.
     */
    aspectRatio?: number;
    /**
     * Converts coordinates from [x, y] to [lon, lat].
     */
    from?: ((coordinates: Array<number>) => Array<number>);
    /**
     * Converts coordinates from [lon, lat] to [x, y].
     */
    to?: ((coordinates: Array<number>) => Array<number>);
}

type Projection = (data: VectorMapProjectionConfig) => any;

type ProjectionMethods = {
    /**
     * Adds a new projection to the internal projection storage.
     */
    add(name: string, projection: VectorMapProjectionConfig | any): void;

    /**
     * Gets a predefined or custom projection from the projection storage.
     * Warning! This type is used for internal purposes. Do not import it directly.
     */
    get(name: 'equirectangular' | 'lambert' | 'mercator' | 'miller' | string): any;
}

/**
 * Creates a new projection.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export const projection: Projection & ProjectionMethods;

