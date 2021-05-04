/**
* DevExtreme (ui/file_uploader.d.ts)
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

import {
    event
} from '../events/index';

import Editor, {
    EditorOptions
} from './editor/editor';

import UploadInfo from '../file_management/upload_info';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxFileUploaderOptions extends EditorOptions<dxFileUploader> {
    /**
     * A function that cancels the file upload.
     */
    abortUpload?: ((file: File, uploadInfo?: UploadInfo) => Promise<any> | JQueryPromise<any> | any);
    /**
     * Specifies a file type or several types accepted by the UI component.
     */
    accept?: string;
    /**
     * Specifies if an end user can remove a file from the selection and interrupt uploading.
     */
    allowCanceling?: boolean;
    /**
     * Restricts file extensions that can be uploaded to the server.
     */
    allowedFileExtensions?: Array<string>;
    /**
     * Specifies the chunk size in bytes. Applies only if uploadMode is 'instantly' or 'useButtons'. Requires a server that can process file chunks.
     */
    chunkSize?: number;
    /**
     * Specifies whether the UI component can be focused using keyboard navigation.
     */
    focusStateEnabled?: boolean;
    /**
     * The text displayed when the extension of the file being uploaded is not an allowed file extension.
     */
    invalidFileExtensionMessage?: string;
    /**
     * The text displayed when the size of the file being uploaded is greater than the maxFileSize.
     */
    invalidMaxFileSizeMessage?: string;
    /**
     * The text displayed when the size of the file being uploaded is less than the minFileSize.
     */
    invalidMinFileSizeMessage?: string;
    /**
     * Specifies the attributes to be passed on to the underlying `` element of the `file` type.
     */
    inputAttr?: any;
    /**
     * Specifies the text displayed on the area to which an end-user can drop a file.
     */
    labelText?: string;
    /**
     * Specifies the maximum file size (in bytes) allowed for uploading. Applies only if uploadMode is 'instantly' or 'useButtons'.
     */
    maxFileSize?: number;
    /**
     * Specifies the minimum file size (in bytes) allowed for uploading. Applies only if uploadMode is 'instantly' or 'useButtons'.
     */
    minFileSize?: number;
    /**
     * Specifies whether the UI component enables an end-user to select a single file or multiple files.
     */
    multiple?: boolean;
    /**
     * Specifies the value passed to the name attribute of the underlying input element. Required to access uploaded files on the server.
     */
    name?: string;
    /**
     * A function that allows you to customize the request before it is sent to the server.
     */
    onBeforeSend?: ((e: { component?: dxFileUploader, element?: dxElement, model?: any, request?: XMLHttpRequest, file?: File, uploadInfo?: UploadInfo }) => any);
    /**
     * A function that is executed when the mouse enters a drop zone while dragging a file.
     */
    onDropZoneEnter?: ((e: { component?: dxFileUploader, element?: dxElement, model?: any, dropZoneElement?: dxElement, event?: event }) => any);
    /**
     * A function that is executed when the mouse leaves a drop zone as it drags a file.
     */
    onDropZoneLeave?: ((e: { component?: dxFileUploader, element?: dxElement, model?: any, dropZoneElement?: dxElement, event?: event }) => any);
    /**
     * A function that is executed when all files are successfully uploaded.
     */
    onFilesUploaded?: ((e: { component?: dxFileUploader, element?: dxElement, model?: any }) => any);
    /**
     * A function that is executed when a file segment is uploaded.
     */
    onProgress?: ((e: { component?: dxFileUploader, element?: dxElement, model?: any, file?: File, segmentSize?: number, bytesLoaded?: number, bytesTotal?: number, event?: event, request?: XMLHttpRequest }) => any);
    /**
     * A function that is executed when the file upload is aborted.
     */
    onUploadAborted?: ((e: { component?: dxFileUploader, element?: dxElement, model?: any, file?: File, event?: event, request?: XMLHttpRequest, message?: string }) => any);
    /**
     * A function that is executed when an error occurs during the file upload.
     */
    onUploadError?: ((e: { component?: dxFileUploader, element?: dxElement, model?: any, file?: File, event?: event, request?: XMLHttpRequest, error?: any, message?: string }) => any);
    /**
     * A function that is executed when the file upload is started.
     */
    onUploadStarted?: ((e: { component?: dxFileUploader, element?: dxElement, model?: any, file?: File, event?: event, request?: XMLHttpRequest }) => any);
    /**
     * A function that is executed when a file is successfully uploaded.
     */
    onUploaded?: ((e: { component?: dxFileUploader, element?: dxElement, model?: any, file?: File, event?: event, request?: XMLHttpRequest, message?: string }) => any);
    /**
     * A function that is executed when one or several files are added to or removed from the selection.
     */
    onValueChanged?: ((e: { component?: dxFileUploader, element?: dxElement, model?: any, value?: Array<File>, previousValue?: Array<File>, event?: event }) => any);
    /**
     * Gets the current progress in percentages.
     */
    progress?: number;
    /**
     * The message displayed by the UI component when it is ready to upload the specified files.
     */
    readyToUploadMessage?: string;
    /**
     * The text displayed on the button that opens the file browser.
     */
    selectButtonText?: string;
    /**
     * Specifies whether or not the UI component displays the list of selected files.
     */
    showFileList?: boolean;
    /**
     * Specifies the HTML element which invokes the file upload dialog.
     */
    dialogTrigger?: string | Element | JQuery;
    /**
     * Specifies the HTML element in which users can drag and drop files for upload.
     */
    dropZone?: string | Element | JQuery;
    /**
     * The text displayed on the button that starts uploading.
     */
    uploadButtonText?: string;
    /**
     * A function that uploads a file in chunks.
     */
    uploadChunk?: ((file: File, uploadInfo: UploadInfo) => Promise<any> | JQueryPromise<any> | any);
    /**
     * The message displayed by the UI component on uploading failure.
     */
    uploadFailedMessage?: string;
    /**
     * The message displayed by the UI component when the file upload is cancelled.
     */
    uploadAbortedMessage?: string;
    /**
     * A function that uploads a file.
     */
    uploadFile?: ((file: File, progressCallback: Function) => Promise<any> | JQueryPromise<any> | any);
    /**
     * Specifies headers for the upload request.
     */
    uploadHeaders?: any;
    /**
     * Specifies custom data for the upload request.
     */
    uploadCustomData?: any;
    /**
     * Specifies the method for the upload request.
     */
    uploadMethod?: 'POST' | 'PUT';
    /**
     * Specifies how the UI component uploads files.
     */
    uploadMode?: 'instantly' | 'useButtons' | 'useForm';
    /**
     * Specifies a target Url for the upload request.
     */
    uploadUrl?: string;
    /**
     * The message displayed by the UI component when uploading is finished.
     */
    uploadedMessage?: string;
    /**
     * Specifies a File instance representing the selected file. Read-only when uploadMode is 'useForm'.
     */
    value?: Array<File>;
}
/**
 * The FileUploader UI component enables an end user to upload files to the server. An end user can select files in the file explorer or drag and drop files to the FileUploader area on the page.
 */
export default class dxFileUploader extends Editor {
    constructor(element: Element, options?: dxFileUploaderOptions)
    constructor(element: JQuery, options?: dxFileUploaderOptions)
    /**
     * Uploads all the selected files.
     */
    upload(): void;
    /**
     * Uploads a file with the specified index.
     */
    upload(fileIndex: number): void;
    /**
     * Uploads the specified file.
     */
    upload(file: File): void;
    /**
     * Cancels the file upload.
     */
    abortUpload(): void;
    /**
     * Cancels the file upload.
     */
    abortUpload(fileIndex: number): void;
    /**
     * Cancels the file upload.
     */
    abortUpload(file: File): void;
    /**
     * Removes a file with the specified index.
     */
    removeFile(fileIndex: number): void;
    /**
     * Removes a file.
     */
    removeFile(file: File): void;
}

declare global {
interface JQuery {
    dxFileUploader(): JQuery;
    dxFileUploader(options: "instance"): dxFileUploader;
    dxFileUploader(options: string): any;
    dxFileUploader(options: string, ...params: any[]): any;
    dxFileUploader(options: dxFileUploaderOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxFileUploaderOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxFileUploaderOptions;
