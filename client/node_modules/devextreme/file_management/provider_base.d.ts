/**
* DevExtreme (file_management/provider_base.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import '../jquery_augmentation';
import FileSystemItem from './file_system_item';
import UploadInfo from './upload_info';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface FileSystemProviderBaseOptions<T = FileSystemProviderBase> {
    /**
     * Specifies which data field provides timestamps that indicate when a file was last modified.
     */
    dateModifiedExpr?: string | Function;
    /**
     * Specifies which data field provides information about whether a file system item is a directory.
     */
    isDirectoryExpr?: string | Function;
    /**
     * Specifies the data field that provides keys.
     */
    keyExpr?: string | Function;
    /**
     * Specifies which data field provides file and directory names.
     */
    nameExpr?: string | Function;
    /**
     * Specifies which data field provides file sizes.
     */
    sizeExpr?: string | Function;
    /**
     * Specifies which data field provides icons to be used as thumbnails.
     */
    thumbnailExpr?: string | Function;
}
/**
 * Contains base provider settings.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export default class FileSystemProviderBase {
    constructor(options?: FileSystemProviderBaseOptions)
    /**
     * Gets file system items.
     */
    getItems(parentDirectory: FileSystemItem): Promise<Array<FileSystemItem>> & JQueryPromise<Array<FileSystemItem>>;

    /**
     * Renames a file or folder.
     */
    renameItem(item: FileSystemItem, newName: string): Promise<any> & JQueryPromise<any>;

    /**
     * Creates a directory.
     */
    createDirectory(parentDirectory: FileSystemItem, name: string): Promise<any> & JQueryPromise<any>;

    /**
     * Deletes files or folders.
     */
    deleteItems(items: Array<FileSystemItem>): Array<Promise<any> & JQueryPromise<any>>;

    /**
     * Moves files and folders.
     */
    moveItems(items: Array<FileSystemItem>, destinationDirectory: FileSystemItem): Array<Promise<any> & JQueryPromise<any>>;

    /**
     * Copies files or folders.
     */
    copyItems(items: Array<FileSystemItem>, destinationDirectory: FileSystemItem): Array<Promise<any> & JQueryPromise<any>>;

    /**
     * Uploads a file in chunks.
     */
    uploadFileChunk(fileData: File, uploadInfo: UploadInfo, destinationDirectory: FileSystemItem): Promise<any> & JQueryPromise<any>;

    /**
     * Cancels the file upload.
     */
    abortFileUpload(fileData: File, uploadInfo: UploadInfo, destinationDirectory: FileSystemItem): Promise<any> & JQueryPromise<any>;

    /**
     * Downloads files.
     */
    downloadItems(items: Array<FileSystemItem>): void;

    /**
     * Gets items content.
     */
    getItemsContent(items: Array<FileSystemItem>): Promise<any> & JQueryPromise<any>;
}
