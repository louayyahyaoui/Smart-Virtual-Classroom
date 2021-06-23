/// <reference types="node" />
import * as xml2js from 'xml2js';
import { EventEmitter } from 'events';
import { IZipFile } from './zipfile';
/**
 *  new EPub(fname[, imageroot][, linkroot])
 *  - fname (String): filename for the ebook
 *  - imageroot (String): URL prefix for images
 *  - linkroot (String): URL prefix for links
 *
 *  Creates an Event Emitter type object for parsing epub files
 *
 *      var epub = new EPub("book.epub");
 *      epub.on("end", function () {
 *           console.log(epub.spine);
 *      });
 *      epub.on("error", function (error) { ... });
 *      epub.parse();
 *
 *  Image and link URL format is:
 *
 *      imageroot + img_id + img_zip_path
 *
 *  So an image "logo.jpg" which resides in "OPT/" in the zip archive
 *  and is listed in the manifest with id "logo_img" will have the
 *  following url (providing that imageroot is "/images/"):
 *
 *      /images/logo_img/OPT/logo.jpg
 **/
declare class EPub extends EventEmitter {
    metadata: EPub.IMetadata;
    manifest: EPub.IMetadataList;
    spine: EPub.ISpine;
    flow: EPub.ISpineContents;
    toc: EPub.ISpineContents;
    ncx: EPub.INcx;
    ncx_depth: number;
    filename: string;
    imageroot: string;
    linkroot: string;
    containerFile: string;
    mimeFile: string;
    rootFile: string;
    zip: IZipFile;
    version: string;
    protected _getStatic(): any;
    constructor(epubfile: string, imagewebroot?: string, chapterwebroot?: string);
    static create(epubfile: string, imagewebroot?: string, chapterwebroot?: string, ...argv: any[]): EPub;
    /**
     *  EPub#parse() -> undefined
     *
     *  Starts the parser, needs to be called by the script
     **/
    parse(): this;
    /**
     *  EPub#open() -> undefined
     *
     *  Opens the epub file with Zip unpacker, retrieves file listing
     *  and runs mime type check
     **/
    open(): void;
    /**
     *  EPub#checkMimeType() -> undefined
     *
     *  Checks if there's a file called "mimetype" and that it's contents
     *  are "application/epub+zip". On success runs root file check.
     **/
    checkMimeType(): void;
    protected _Elem(element: EPub.TocElement): EPub.TocElement;
    /**
     *  EPub#getRootFiles() -> undefined
     *
     *  Looks for a "meta-inf/container.xml" file and searches for a
     *  rootfile element with mime type "application/oebps-package+xml".
     *  On success calls the rootfile parser
     **/
    getRootFiles(): void;
    /**
     *  EPub#handleRootFile() -> undefined
     *
     *  Parses the rootfile XML and calls rootfile parser
     **/
    handleRootFile(): void;
    /**
     *  EPub#parseRootFile() -> undefined
     *
     *  Parses elements "metadata," "manifest," "spine" and TOC.
     *  Emits "end" if no TOC
     **/
    parseRootFile(rootfile: any): void;
    /**
     *  EPub#parseMetadata() -> undefined
     *
     *  Parses "metadata" block (book metadata, title, author etc.)
     **/
    parseMetadata(metadata: EPub.IMetadata): void;
    /**
     *  EPub#parseManifest() -> undefined
     *
     *  Parses "manifest" block (all items included, html files, images, styles)
     **/
    parseManifest(manifest: any): void;
    /**
     *  EPub#parseSpine() -> undefined
     *
     *  Parses "spine" block (all html elements that are shown to the reader)
     **/
    parseSpine(spine: any): void;
    /**
     *  EPub#parseTOC() -> undefined
     *
     *  Parses ncx file for table of contents (title, html file)
     **/
    parseTOC(): void;
    /**
     *  EPub#walkNavMap(branch, path, id_list,[, level]) -> Array
     *  - branch (Array | Object): NCX NavPoint object
     *  - path (Array): Base path
     *  - id_list (Object): map of file paths and id values
     *  - level (Number): deepness
     *
     *  Walks the NavMap object through all levels and finds elements
     *  for TOC
     **/
    walkNavMap(branch: any, path: any, id_list: any, level: number, pe?: EPub.TocElement, parentNcx?: EPub.INcxTree, ncx_idx?: any): any[];
    /**
     *  EPub#getChapter(id, callback) -> undefined
     *  - id (String): Manifest id value for a chapter
     *  - callback (Function): callback function
     *
     *  Finds a chapter text for an id. Replaces image and link URL's, removes
     *  <head> etc. elements. Return only chapters with mime type application/xhtml+xml
     **/
    getChapter(chapterId: string, callback: (error: Error, text?: string) => void): void;
    /**
     *  EPub#getChapterRaw(id, callback) -> undefined
     *  - id (String): Manifest id value for a chapter
     *  - callback (Function): callback function
     *
     *  Returns the raw chapter text for an id.
     **/
    getChapterRaw(chapterId: string, callback: (error: Error, text?: string) => void): void;
    /**
     *  EPub#getImage(id, callback) -> undefined
     *  - id (String): Manifest id value for an image
     *  - callback (Function): callback function
     *
     *  Finds an image for an id. Returns the image as Buffer. Callback gets
     *  an error object, image buffer and image content-type.
     *  Return only images with mime type image
     **/
    getImage(id: string, callback: (error: Error, data?: Buffer, mimeType?: string) => void): void;
    /**
     *  EPub#getFile(id, callback) -> undefined
     *  - id (String): Manifest id value for a file
     *  - callback (Function): callback function
     *
     *  Finds a file for an id. Returns the file as Buffer. Callback gets
     *  an error object, file contents buffer and file content-type.
     **/
    getFile(id: string, callback: (error: Error, data?: Buffer, mimeType?: string) => void): void;
    readFile(filename: any, options: any, callback_: any): void;
    static SYMBOL_RAW_DATA: symbol;
}
declare module EPub {
    const xml2jsOptions: xml2js.Options;
    const IMAGE_ROOT = "/images/";
    const LINK_ROOT = "/links/";
    const ELEM_MEDIA_TYPE = "media-type";
    const ELEM_MEDIA_TYPE2 = "mediaType";
    interface TocElement {
        level?: number;
        order?: number;
        title?: string;
        id?: string;
        href?: string;
        'media-type'?: string;
        mediaType?: string;
        'epub-type'?: string;
        lang?: string;
        series?: string;
        contribute?: string[];
        author_link_map?: {
            [key: string]: string;
        };
    }
    interface ISpine {
        contents: ISpineContents;
        toc?: TocElement;
        itemref?: Object[];
    }
    interface IMetadataList {
        [key: string]: EPub.TocElement;
    }
    interface ISpineContents extends Array<EPub.TocElement> {
        [index: number]: EPub.TocElement;
    }
    interface IMetadata {
        publisher?: string;
        language?: string;
        title?: string;
        subject?: string[];
        description?: string;
        creator?: string;
        creatorFileAs?: string;
        date?: string;
        ISBN?: string;
        UUID?: string;
        cover?: any;
        'file-as'?: string;
        'belongs-to-collection'?: string;
        'calibre:series'?: string;
        'collection-type'?: string;
        [key: string]: any;
    }
    interface INcx extends Array<INcxTree> {
        [index: number]: INcxTree;
    }
    interface INcxTree {
        id: string;
        ncx_index: number;
        ncx_index2?: number;
        level?: number;
        sub: INcxTree[];
    }
    function isEpub(data: string, buf?: boolean): string;
    function isEpub(data: Buffer, buf?: boolean): Buffer;
    function isEpub(data: any, buf?: boolean): any;
}
export = EPub;
