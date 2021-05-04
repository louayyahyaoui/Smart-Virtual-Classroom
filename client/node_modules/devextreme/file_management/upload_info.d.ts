/**
* DevExtreme (file_management/upload_info.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * An object that provides information about the file upload session.
 */
export default interface UploadInfo {
    /**
     * The number of bytes that is uploaded to the server.
     */
    bytesUploaded: number;

    /**
     * The number of uploaded chunks and chunks that are to be uploaded.
     */
    chunkCount: number;

    /**
     * Information saved during the file upload.
     */
    customData: any;

    /**
     * The binary content of the uploading chunk.
     */
    chunkBlob: Blob;

    /**
     * The index of the uploading chunk.
     */
    chunkIndex: number;
}