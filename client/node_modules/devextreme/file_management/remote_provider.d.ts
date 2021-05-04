/**
* DevExtreme (file_management/remote_provider.d.ts)
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
export interface RemoteFileSystemProviderOptions extends FileSystemProviderBaseOptions<RemoteFileSystemProvider> {
    /**
     * Specifies the URL of an endpoint used to access and modify a file system located on the server.
     */
    endpointUrl?: string;
    /**
     * Specifies which data field provides information about whether a directory has subdirectories.
     */
    hasSubDirectoriesExpr?: string | Function;
}
/**
 * The Remote file system provider works with a file system located on the server.
 */
export default class RemoteFileSystemProvider extends FileSystemProviderBase {
    constructor(options?: RemoteFileSystemProviderOptions)
}
