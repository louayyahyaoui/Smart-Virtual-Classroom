/**
* DevExtreme (file_management/custom_provider.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import FileSystemProviderBase, {
    FileSystemProviderBaseOptions
} from './provider_base';

import FileSystemItem from './file_system_item';
import UploadInfo from './upload_info';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface CustomFileSystemProviderOptions extends FileSystemProviderBaseOptions<CustomFileSystemProvider> {
    /**
     * A function that cancels the file upload.
     */
    abortFileUpload?: ((file: File, uploadInfo: UploadInfo, destinationDirectory: FileSystemItem) => Promise<any> | JQueryPromise<any> | any);

    /**
     * A function that copies files or folders.
     */
    copyItem?: ((item: FileSystemItem, destinationDirectory: FileSystemItem) => Promise<any> | JQueryPromise<any> | any);

    /**
     * A function that creates a directory.
     */
    createDirectory?: ((parentDirectory: FileSystemItem, name: string) => Promise<any> | JQueryPromise<any> | any);

    /**
     * A function that deletes a file or folder.
     */
    deleteItem?: ((item: FileSystemItem) => Promise<any> | JQueryPromise<any> | any);

    /**
     * A function that downloads files.
     */
    downloadItems?: ((items: Array<FileSystemItem>) => any);

    /**
     * A function that gets file system items.
     */
    getItems?: ((parentDirectory: FileSystemItem) => Promise<Array<any>> | JQueryPromise<Array<any>> | Array<any>);

    /**
     * A function that get items content.
     */
    getItemsContent?: ((items: Array<FileSystemItem>) => Promise<any> | JQueryPromise<any> | any);

    /**
     * A function or the name of a data source field that provides information on whether a file or folder contains sub directories.
     */
    hasSubDirectoriesExpr?: string | Function;

    /**
     * A function that moves files and folders.
     */
    moveItem?: ((item: FileSystemItem, destinationDirectory: FileSystemItem) => Promise<any> | JQueryPromise<any> | any);

    /**
     * A function that renames files and folders.
     */
    renameItem?: ((item: FileSystemItem, newName: string) => Promise<any> | JQueryPromise<any> | any);

    /**
     * A function that uploads a file in chunks.
     */
    uploadFileChunk?: ((file: File, uploadInfo: UploadInfo, destinationDirectory: FileSystemItem) => Promise<any> | JQueryPromise<any> | any);
}

/**
 * A custom file system provider allows you to implement custom APIs to access and use file systems.
 */
export default class CustomFileSystemProvider extends FileSystemProviderBase {
    constructor(options?: CustomFileSystemProviderOptions)
}
