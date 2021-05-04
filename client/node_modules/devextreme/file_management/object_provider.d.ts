/**
* DevExtreme (file_management/object_provider.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import FileSystemProviderBase, {
    FileSystemProviderBaseOptions
} from './provider_base';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface ObjectFileSystemProviderOptions extends FileSystemProviderBaseOptions<ObjectFileSystemProvider> {
    /**
     * Specifies which data field provides information about files content.
     */
    contentExpr?: string | Function;
    /**
     * Specifies an array of data objects that represent files and directories.
     */
    data?: Array<any>;
    /**
     * Specifies which data field provides information about nested files and directories.
     */
    itemsExpr?: string | Function;
}
/**
 * The Object file system provider works with a file system represented by an in-memory array of JSON objects.
 */
export default class ObjectFileSystemProvider extends FileSystemProviderBase {
    constructor(options?: ObjectFileSystemProviderOptions)
}
