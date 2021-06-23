import * as xml2js from 'xml2js';
import * as util from 'util';
import { EventEmitter } from 'events';
import { ZipFile, IZipFile } from './zipfile';

//TODO: Cache parsed data

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
class EPub extends EventEmitter
{
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

	protected _getStatic()
	{
		// @ts-ignore
		return this.__proto__.constructor;
	}

	constructor(epubfile: string, imagewebroot?: string, chapterwebroot?: string)
	{
		super();

		this.filename = epubfile;

		this.imageroot = (imagewebroot || this._getStatic().IMAGE_ROOT).trim();
		this.linkroot = (chapterwebroot || this._getStatic().LINK_ROOT).trim();

		if (this.imageroot.substr(-1) != "/")
		{
			this.imageroot += "/";
		}
		if (this.linkroot.substr(-1) != "/")
		{
			this.linkroot += "/";
		}
	}

	static create(epubfile: string, imagewebroot?: string, chapterwebroot?: string, ...argv)
	{
		let epub = new this(epubfile, imagewebroot, chapterwebroot, ...argv);

		return epub;
	}

	/**
	 *  EPub#parse() -> undefined
	 *
	 *  Starts the parser, needs to be called by the script
	 **/
	public parse()
	{
		this.containerFile = null;
		this.mimeFile = null;
		this.rootFile = null;

		this.metadata = {};
		this.manifest = {};
		this.spine = { toc: null, contents: [] };
		this.flow = [];
		this.toc = [];

		this.open();

		return this;
	}

	/**
	 *  EPub#open() -> undefined
	 *
	 *  Opens the epub file with Zip unpacker, retrieves file listing
	 *  and runs mime type check
	 **/
	open()
	{
		try
		{
			// @ts-ignore
			this.zip = new ZipFile(this.filename);
		}
		catch (E)
		{
			this.emit("error", new Error(`Invalid/missing file ${this.filename}`));
			return;
		}

		if (!this.zip.names || !this.zip.names.length)
		{
			this.emit("error", new Error(`No files in archive ${this.filename}`));
			return;
		}
		this.checkMimeType();
	}

	/**
	 *  EPub#checkMimeType() -> undefined
	 *
	 *  Checks if there's a file called "mimetype" and that it's contents
	 *  are "application/epub+zip". On success runs root file check.
	 **/
	checkMimeType()
	{
		var i, len;

		for (i = 0, len = this.zip.names.length; i < len; i++)
		{
			if (this.zip.names[i].toLowerCase() == "mimetype")
			{
				this.mimeFile = this.zip.names[i];
				break;
			}
		}
		if (!this.mimeFile)
		{
			this.emit("error", new Error("No mimetype file in archive"));
			return;
		}
		this.zip.readFile(this.mimeFile, (function (err, data)
		{
			if (err)
			{
				this.emit("error", new Error("Reading archive failed"));
				return;
			}

			if (!EPub.isEpub(data, true))
			{
				this.emit("error", new Error("Unsupported mime type"));
				return;
			}

			this.getRootFiles();
		}).bind(this));
	}

	protected _Elem(element: EPub.TocElement)
	{
		const SYMBOL_RAW_DATA = this._getStatic().SYMBOL_RAW_DATA;

		if (!element[SYMBOL_RAW_DATA])
		{
			element[SYMBOL_RAW_DATA] = Object.assign({}, element);
		}

		if (element['media-type'])
		{
			element['mediaType'] = element['media-type'];
		}

		return element;
	}

	/**
	 *  EPub#getRootFiles() -> undefined
	 *
	 *  Looks for a "meta-inf/container.xml" file and searches for a
	 *  rootfile element with mime type "application/oebps-package+xml".
	 *  On success calls the rootfile parser
	 **/
	getRootFiles()
	{
		var i, len;
		for (i = 0, len = this.zip.names.length; i < len; i++)
		{
			if (this.zip.names[i].toLowerCase() == "meta-inf/container.xml")
			{
				this.containerFile = this.zip.names[i];
				break;
			}
		}
		if (!this.containerFile)
		{
			this.emit("error", new Error("No container file in archive"));
			return;
		}

		const xml2jsOptions = this._getStatic().xml2jsOptions;

		this.zip.readFile(this.containerFile, (function (err, data)
		{
			if (err)
			{
				this.emit("error", new Error("Reading archive failed"));
				return;
			}
			var xml = data.toString("utf-8").toLowerCase().trim(),
				xmlparser = new xml2js.Parser(xml2jsOptions);

			xmlparser.on("end", (function (result)
			{

				if (!result.rootfiles || !result.rootfiles.rootfile)
				{
					this.emit("error", new Error("No rootfiles found"));
					console.dir(result);
					return;
				}

				var rootfile = result.rootfiles.rootfile,
					filename = false, i, len;

				if (Array.isArray(rootfile))
				{

					for (i = 0, len = rootfile.length; i < len; i++)
					{
						if (rootfile[i]["@"]["media-type"] &&
							rootfile[i]["@"]["media-type"] == "application/oebps-package+xml" &&
							rootfile[i]["@"]["full-path"])
						{
							filename = rootfile[i]["@"]["full-path"].toLowerCase().trim();
							break;
						}
					}

				}
				else if (rootfile["@"])
				{
					if (rootfile["@"]["media-type"] != "application/oebps-package+xml" || !rootfile["@"]["full-path"])
					{
						this.emit("error", new Error("Rootfile in unknown format"));
						return;
					}
					filename = rootfile["@"]["full-path"].toLowerCase().trim();
				}

				if (!filename)
				{
					this.emit("error", new Error("Empty rootfile"));
					return;
				}

				for (i = 0, len = this.zip.names.length; i < len; i++)
				{
					if (this.zip.names[i].toLowerCase() == filename)
					{
						this.rootFile = this.zip.names[i];
						break;
					}
				}

				if (!this.rootFile)
				{
					this.emit("error", new Error("Rootfile not found from archive"));
					return;
				}

				this.handleRootFile();

			}).bind(this));

			xmlparser.on("error", (function (err)
			{
				this.emit("error", new Error("Parsing container XML failed"));
				return;
			}).bind(this));

			xmlparser.parseString(xml);

		}).bind(this));
	}

	/**
	 *  EPub#handleRootFile() -> undefined
	 *
	 *  Parses the rootfile XML and calls rootfile parser
	 **/
	handleRootFile()
	{
		const xml2jsOptions = this._getStatic().xml2jsOptions;

		this.zip.readFile(this.rootFile, (function (err, data)
		{
			if (err)
			{
				this.emit("error", new Error("Reading archive failed"));
				return;
			}
			var xml = data.toString("utf-8"),
				xmlparser = new xml2js.Parser(xml2jsOptions);

			xmlparser.on("end", this.parseRootFile.bind(this));

			xmlparser.on("error", (function (err)
			{
				this.emit("error", new Error("Parsing container XML failed"));
				return;
			}).bind(this));

			xmlparser.parseString(xml);

		}).bind(this));
	}

	/**
	 *  EPub#parseRootFile() -> undefined
	 *
	 *  Parses elements "metadata," "manifest," "spine" and TOC.
	 *  Emits "end" if no TOC
	 **/
	parseRootFile(rootfile)
	{

		this.version = rootfile['@'].version || '2.0';

		var i, len, keys, keyparts, key;
		keys = Object.keys(rootfile);
		for (i = 0, len = keys.length; i < len; i++)
		{
			keyparts = keys[i].split(":");
			key = (keyparts.pop() || "").toLowerCase().trim();
			switch (key)
			{
				case "metadata":
					this.parseMetadata(rootfile[keys[i]]);
					break;
				case "manifest":
					this.parseManifest(rootfile[keys[i]]);
					break;
				case "spine":
					this.parseSpine(rootfile[keys[i]]);
					break;
				case "guide":
					//this.parseGuide(rootfile[keys[i]]);
					break;
			}
		}

		if (this.spine.toc)
		{
			this.parseTOC();
		}
		else
		{
			this.emit("end");
		}
	}

	/**
	 *  EPub#parseMetadata() -> undefined
	 *
	 *  Parses "metadata" block (book metadata, title, author etc.)
	 **/
	parseMetadata(metadata: EPub.IMetadata)
	{
		let i, j, len, keys, keyparts, key;
		const _self = this;

		this.metadata[EPub.SYMBOL_RAW_DATA] = metadata;

		keys = Object.keys(metadata);
		for (i = 0, len = keys.length; i < len; i++)
		{
			keyparts = keys[i].split(":");
			key = (keyparts.pop() || "").toLowerCase().trim();

			const currentData = metadata[keys[i]];

			switch (key)
			{
				case "publisher":
					if (Array.isArray(currentData))
					{
						this.metadata.publisher = String(currentData[0] && currentData[0]["#"] || currentData[0] || "")
							.trim();
					}
					else
					{
						this.metadata.publisher = String(currentData["#"] || currentData || "").trim();
					}
					break;
				case "language":
					if (Array.isArray(currentData))
					{
						this.metadata.language = String(currentData[0] && currentData[0]["#"] || currentData[0] || "")
							.toLowerCase()
							.trim();
					}
					else
					{

						this.metadata.language = String(currentData["#"] || currentData || "")
							.toLowerCase()
							.trim();
					}
					break;
				case "title":
					if (Array.isArray(currentData))
					{
						this.metadata.title = String(currentData[0] && currentData[0]["#"] || currentData[0] || "")
							.trim();
					}
					else
					{
						this.metadata.title = String(currentData["#"] || currentData || "").trim();
					}
					break;
				case "subject":

					this.metadata.subject = this.metadata.subject || [];

					(Array.isArray(currentData) ? currentData : [currentData])
						.forEach(function (value)
						{
							let tag = (_meta_val(value, '#') || '').trim();
							if (tag !== '')
							{
								_self.metadata.subject.push(tag);
							}
						})
					;

					break;
				case "description":
					if (Array.isArray(currentData))
					{
						this.metadata.description = String(currentData[0] && currentData[0]["#"] || currentData[0] || "")
							.trim();
					}
					else
					{
						this.metadata.description = String(currentData["#"] || currentData || "").trim();
					}
					break;
				case "creator":
					if (Array.isArray(currentData))
					{
						this.metadata.creator = String(currentData[0] && currentData[0]["#"] || currentData[0] || "")
							.trim();
						this.metadata.creatorFileAs = String(currentData[0] && currentData[0]['@'] && currentData[0]['@']["opf:file-as"] || this.metadata.creator)
							.trim();
					}
					else
					{
						this.metadata.creator = String(currentData["#"] || currentData || "").trim();
						this.metadata.creatorFileAs = String(currentData['@'] && currentData['@']["opf:file-as"] || this.metadata.creator)
							.trim();
					}
					break;
				case "date":
					if (Array.isArray(currentData))
					{
						this.metadata.date = String(currentData[0] && currentData[0]["#"] || currentData[0] || "")
							.trim();
					}
					else
					{
						this.metadata.date = String(currentData["#"] || currentData || "").trim();
					}
					break;
				case "identifier":
					if (currentData["@"] && currentData["@"]["opf:scheme"] == "ISBN")
					{
						this.metadata.ISBN = String(currentData["#"] || "").trim();
					}
					else if (currentData["@"] && currentData["@"].id && currentData["@"].id.match(/uuid/i))
					{
						this.metadata.UUID = String(currentData["#"] || "")
							.replace('urn:uuid:', '')
							.toUpperCase()
							.trim();
					}
					else if (Array.isArray(currentData))
					{
						for (j = 0; j < currentData.length; j++)
						{
							if (currentData[j]["@"])
							{
								if (currentData[j]["@"]["opf:scheme"] == "ISBN")
								{
									this.metadata.ISBN = String(currentData[j]["#"] || "").trim();
								}
								else if (currentData[j]["@"].id && currentData[j]["@"].id.match(/uuid/i))
								{
									this.metadata.UUID = String(currentData[j]["#"] || "")
										.replace('urn:uuid:', '')
										.toUpperCase()
										.trim();
								}
							}
						}
					}
					break;
				case 'meta':
					if (currentData['#'] && currentData['@'].property == 'calibre:author_link_map')
					{
						this.metadata['contribute'] = this.metadata['contribute'] || [];
						this.metadata['author_link_map'] = this.metadata['author_link_map'] || {};

						let t = JSON.parse(currentData['#']);

						for (let n in t)
						{
							n = n.toString().trim();

							this.metadata['contribute'].push(n);
							this.metadata['author_link_map'][n] = (t[n] || '').toString().trim();
						}

						this.metadata['contribute'] = array_unique(this.metadata['contribute']);
					}

					break;
				default:
					//console.log(key, currentData);
					break;
			}
		}

		let metas = metadata['meta'] || {};
		Object.keys(metas).forEach(function (key)
		{
			var meta = metas[key];
			if (meta['@'] && meta['@'].name)
			{
				var name = meta['@'].name;
				this.metadata[name] = meta['@'].content;

				if (name == 'calibre:series')
				{
					this.metadata['series'] = this.metadata['series'] || meta['@'].content;
				}
			}
			if (meta['#'] && meta['@'].property)
			{
				this.metadata[meta['@'].property] = meta['#'];
			}

			if (meta.name && meta.name == "cover")
			{
				this.metadata[meta.name] = meta.content;
			}
		}, this);

		function _meta_val(row, key = null)
		{
			if (key !== null)
			{
				return row[key] || row;
			}

			return row;
		}
	}

	/**
	 *  EPub#parseManifest() -> undefined
	 *
	 *  Parses "manifest" block (all items included, html files, images, styles)
	 **/
	parseManifest(manifest)
	{
		var i, len, path = this.rootFile.split("/"), element, path_str;
		path.pop();
		path_str = path.join("/");

		if (manifest.item)
		{
			for (i = 0, len = manifest.item.length; i < len; i++)
			{
				if (manifest.item[i]['@'])
				{
					element = manifest.item[i]['@'];

					element = this._Elem(element);

					if (element.href && element.href.substr(0, path_str.length) != path_str)
					{
						element.href = path.concat([element.href]).join("/");
					}

					this.manifest[manifest.item[i]['@'].id] = element;

				}
			}
		}
	}

	/**
	 *  EPub#parseSpine() -> undefined
	 *
	 *  Parses "spine" block (all html elements that are shown to the reader)
	 **/
	parseSpine(spine)
	{
		var i, len, path = this.rootFile.split("/"), element;
		path.pop();

		if (spine['@'] && spine['@'].toc)
		{
			this.spine.toc = this.manifest[spine['@'].toc] || null;
		}

		if (spine.itemref)
		{
			if (!Array.isArray(spine.itemref))
			{
				spine.itemref = [spine.itemref];
			}
			for (i = 0, len = spine.itemref.length; i < len; i++)
			{
				if (spine.itemref[i]['@'])
				{
					if (element = this.manifest[spine.itemref[i]['@'].idref])
					{
						this.spine.contents.push(element);
					}
				}
			}
		}
		this.flow = this.spine.contents;
	}

	/**
	 *  EPub#parseTOC() -> undefined
	 *
	 *  Parses ncx file for table of contents (title, html file)
	 **/
	parseTOC()
	{
		var i, len, path = this.spine.toc.href.split("/"), id_list = {}, keys;
		path.pop();

		keys = Object.keys(this.manifest);
		for (i = 0, len = keys.length; i < len; i++)
		{
			id_list[this.manifest[keys[i]].href] = keys[i];
		}

		const xml2jsOptions = this._getStatic().xml2jsOptions;

		this.zip.readFile(this.spine.toc.href, (function (err, data)
		{
			if (err)
			{
				this.emit("error", new Error("Reading archive failed"));
				return;
			}
			var xml = data.toString("utf-8"),
				xmlparser = new xml2js.Parser(xml2jsOptions);

			xmlparser.on("end", (function (result)
			{
				if (result.navMap && result.navMap.navPoint)
				{
					this.toc = this.walkNavMap(result.navMap.navPoint, path, id_list);
				}

				this.emit("end");
			}).bind(this));

			xmlparser.on("error", (function (err)
			{
				this.emit("error", new Error("Parsing container XML failed"));
				return;
			}).bind(this));

			xmlparser.parseString(xml);

		}).bind(this));
	}

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
	walkNavMap(branch, path, id_list, level: number, pe?: EPub.TocElement, parentNcx?: EPub.INcxTree, ncx_idx?)
	{
		ncx_idx = ncx_idx || {
			index: 0,
		};

		level = level || 0;

		this.ncx_depth = Math.max(level + 1, this.ncx_depth || 0);

		// don't go too far
		if (level > 7)
		{
			return [];
		}

		var output = [];

		if (!Array.isArray(branch))
		{
			branch = [branch];
		}

		this.ncx = this.ncx || [];

		for (var i = 0; i < branch.length; i++)
		{
			let element: EPub.TocElement;
			let currentNcx;

			if (branch[i].navLabel)
			{
				var title = '';
				if (branch[i].navLabel && typeof branch[i].navLabel.text == 'string')
				{
					/*
					title = branch[i].navLabel && branch[i].navLabel.text || branch[i].navLabel === branch[i].navLabel
						? ''
						: (branch[i].navLabel && branch[i].navLabel.text || branch[i].navLabel || "").trim();
					*/

					title = (branch[i].navLabel && branch[i].navLabel.text || branch[i].navLabel || "").trim();
				}
				var order = Number(branch[i]["@"] && branch[i]["@"].playOrder || 0);
				if (isNaN(order))
				{
					order = 0;
				}
				var href = '';
				if (branch[i].content && branch[i].content["@"] && typeof branch[i].content["@"].src == 'string')
				{
					href = branch[i].content["@"].src.trim();
				}

				element = {
					level: level,
					order: order,
					title: title
				};

				if (href)
				{
					href = path.concat([href]).join("/");
					element.href = href;

					if (id_list[element.href])
					{
						// link existing object
						element = this.manifest[id_list[element.href]];

						element.title = title;
						element.order = order;
						element.level = level;
					}
					else
					{
						// use new one
						element.href = href;
						element.id = (branch[i]["@"] && branch[i]["@"].id || "").trim();
					}

					if (level == 0)
					{
						let idx = this.ncx.length;

						currentNcx = this.ncx[idx] = {
							id: element.id,
							ncx_index: idx,
							ncx_index2: ncx_idx.index++,
							level,
							sub: [],
						};
					}
					else if (parentNcx)
					{
						let idx = parentNcx.sub.length;

						currentNcx = parentNcx.sub[parentNcx.sub.length] = {
							id: element.id,
							ncx_index: idx,
							ncx_index2: ncx_idx.index++,
							level,
							sub: [],
						};
					}

					output.push(element);
				}
			}

			//console.log(ncx_idx);

			if (branch[i].navPoint)
			{
				output = output.concat(this.walkNavMap(branch[i].navPoint, path, id_list, level + 1, element, currentNcx, ncx_idx));
			}
		}
		return output;
	}

	/**
	 *  EPub#getChapter(id, callback) -> undefined
	 *  - id (String): Manifest id value for a chapter
	 *  - callback (Function): callback function
	 *
	 *  Finds a chapter text for an id. Replaces image and link URL's, removes
	 *  <head> etc. elements. Return only chapters with mime type application/xhtml+xml
	 **/
	getChapter(chapterId: string, callback: (error: Error, text?: string) => void)
	{
		this.getChapterRaw(chapterId, (function (err, str)
		{
			if (err)
			{
				callback(err);
				return;
			}

			var i, len, path = this.rootFile.split("/"), keys = Object.keys(this.manifest);
			path.pop();

			// remove linebreaks (no multi line matches in JS regex!)
			str = str.replace(/\r?\n/g, "\u0000");

			// keep only <body> contents
			str.replace(/<body[^>]*?>(.*)<\/body[^>]*?>/i, function (o, d)
			{
				str = d.trim();
			});

			// remove <script> blocks if any
			str = str.replace(/<script[^>]*?>(.*?)<\/script[^>]*?>/ig, function (o, s)
			{
				return "";
			});

			// remove <style> blocks if any
			str = str.replace(/<style[^>]*?>(.*?)<\/style[^>]*?>/ig, function (o, s)
			{
				return "";
			});

			// remove onEvent handlers
			str = str.replace(/(\s)(on\w+)(\s*=\s*["']?[^"'\s>]*?["'\s>])/g, function (o, a, b, c)
			{
				return a + "skip-" + b + c;
			});

			// replace images
			str = str.replace(/(\ssrc\s*=\s*["']?)([^"'\s>]*?)(["'\s>])/g, (function (o, a, b, c)
			{
				var img = path.concat([b]).join("/").trim(),
					element;

				for (i = 0, len = keys.length; i < len; i++)
				{
					if (this.manifest[keys[i]].href == img)
					{
						element = this.manifest[keys[i]];
						break;
					}
				}

				// include only images from manifest
				if (element)
				{
					return a + this.imageroot + element.id + "/" + img + c;
				}
				else
				{
					return "";
				}

			}).bind(this));

			// replace links
			str = str.replace(/(\shref\s*=\s*["']?)([^"'\s>]*?)(["'\s>])/g, (function (o, a, b, c)
			{
				var linkparts = b && b.split("#"),
					link = path.concat([(linkparts.shift() || "")]).join("/").trim(),
					element;

				for (i = 0, len = keys.length; i < len; i++)
				{
					if (this.manifest[keys[i]].href.split("#")[0] == link)
					{
						element = this.manifest[keys[i]];
						break;
					}
				}

				if (linkparts.length)
				{
					link += "#" + linkparts.join("#");
				}

				// include only images from manifest
				if (element)
				{
					return a + this.linkroot + element.id + "/" + link + c;
				}
				else
				{
					return a + b + c;
				}

			}).bind(this));

			// bring back linebreaks
			str = str.replace(/\u0000/g, "\n").trim();

			callback(null, str);
		}).bind(this));
	}

	/**
	 *  EPub#getChapterRaw(id, callback) -> undefined
	 *  - id (String): Manifest id value for a chapter
	 *  - callback (Function): callback function
	 *
	 *  Returns the raw chapter text for an id.
	 **/
	getChapterRaw(chapterId: string, callback: (error: Error, text?: string) => void)
	{
		if (this.manifest[chapterId])
		{

			if (!(this.manifest[chapterId]['media-type'] == "application/xhtml+xml" || this.manifest[chapterId]['media-type'] == "image/svg+xml"))
			{
				return callback(new Error(`Invalid mime type for chapter "${chapterId}" ${this.manifest[chapterId]['media-type']}`));
			}

			this.zip.readFile(this.manifest[chapterId].href, (function (err, data)
			{
				if (err)
				{
					callback(new Error(`Reading archive failed "${chapterId}"`));
					return;
				}

				var str = data.toString("utf-8");

				callback(null, str);

			}).bind(this));
		}
		else
		{
			callback(new Error(`File not found "${chapterId}"`));
		}
	}

	/**
	 *  EPub#getImage(id, callback) -> undefined
	 *  - id (String): Manifest id value for an image
	 *  - callback (Function): callback function
	 *
	 *  Finds an image for an id. Returns the image as Buffer. Callback gets
	 *  an error object, image buffer and image content-type.
	 *  Return only images with mime type image
	 **/
	getImage(id: string, callback: (error: Error, data?: Buffer, mimeType?: string) => void)
	{
		if (this.manifest[id])
		{

			if ((this.manifest[id]['media-type'] || "").toLowerCase().trim().substr(0, 6) != "image/")
			{
				return callback(new Error("Invalid mime type for image"));
			}

			this.getFile(id, callback);
		}
		else
		{
			callback(new Error("File not found"));
		}
	}

	/**
	 *  EPub#getFile(id, callback) -> undefined
	 *  - id (String): Manifest id value for a file
	 *  - callback (Function): callback function
	 *
	 *  Finds a file for an id. Returns the file as Buffer. Callback gets
	 *  an error object, file contents buffer and file content-type.
	 **/
	getFile(id: string, callback: (error: Error, data?: Buffer, mimeType?: string) => void)
	{
		if (this.manifest[id])
		{
			let self = this;

			this.zip.readFile(this.manifest[id].href, (function (err, data)
			{
				if (err)
				{
					callback(new Error(`Reading archive failed ${self.manifest[id].href}`));
					return;
				}

				callback(null, data, this.manifest[id]['media-type']);
			}).bind(this));
		}
		else
		{
			callback(new RangeError(`File not found "${id}"`));
		}
	}

	readFile(filename, options, callback_)
	{
		var callback = arguments[arguments.length - 1];

		if (util.isFunction(options) || !options)
		{
			this.zip.readFile(filename, callback);
		}
		else if (util.isString(options))
		{
			// options is an encoding
			this.zip.readFile(filename, function (err, data)
			{
				if (err)
				{
					callback(new Error(`Reading archive failed ${filename}`));
					return;
				}
				callback(null, data.toString(options));
			});
		}
		else
		{
			throw new TypeError('Bad arguments');
		}
	}

	static SYMBOL_RAW_DATA = Symbol.for('rawData');
}

module EPub
{
	export const xml2jsOptions = Object.assign({}, xml2js.defaults['0.1']) as xml2js.Options;

	export const IMAGE_ROOT = '/images/';
	export const LINK_ROOT = '/links/';

	//export const SYMBOL_RAW_DATA = Symbol.for('rawData');

	export const ELEM_MEDIA_TYPE = 'media-type';
	export const ELEM_MEDIA_TYPE2 = 'mediaType';

	export interface TocElement
	{
		level?: number;
		order?: number;
		title?: string;
		id?: string;
		href?: string;

		'media-type'?: string,
		mediaType?: string,
		'epub-type'?: string,
		lang?: string,

		series?: string,

		contribute?: string[],
		author_link_map?: {
			[key: string]: string,
		}
	}

	export interface ISpine
	{
		contents: ISpineContents,
		toc?: TocElement,

		itemref?: Object[],
	}

	export interface IMetadataList
	{
		[key: string]: EPub.TocElement,
	}

	export interface ISpineContents extends Array<EPub.TocElement>
	{
		[index: number]: EPub.TocElement,
	}

	export interface IMetadata
	{
		publisher?: string,
		language?: string,
		title?: string,
		subject?: string[],
		description?: string,

		creator?: string,
		creatorFileAs?: string,

		date?: string,
		ISBN?: string,
		UUID?: string,
		cover?

		'file-as'?: string,

		'belongs-to-collection'?: string,
		'calibre:series'?: string,
		'collection-type'?: string,

		[key: string]: any,
	}

	export interface INcx extends Array<INcxTree>
	{
		[index: number]: INcxTree
	}

	export interface INcxTree
	{
		id: string;
		ncx_index: number;
		ncx_index2?: number;
		level?: number;
		sub: INcxTree[],
	}

	export function isEpub(data: string, buf?: boolean): string
	export function isEpub(data: Buffer, buf?: boolean): Buffer
	export function isEpub(data, buf?: boolean)
	export function isEpub(data, buf?: boolean)
	{
		let txt = (typeof data == 'string' && !buf) ? data : data.toString("utf-8").toLowerCase().trim();

		if (txt === 'application/epub+zip')
		{
			return data;
		}

		return null;
	}

}

// Expose to the world
export = EPub;

/*
// @ts-ignore
declare module "epub"
{

	import { EventEmitter } from "events";

	interface TocElement
	{
		level: number;
		order: number;
		title: string;
		id: string;
		href?: string;
	}

	class EPub extends EventEmitter
	{
		constructor(epubfile: string, imagewebroot?: string, chapterwebroot?: string);

		metadata: Object;
		manifest: Object;
		spine: Object;
		flow: Array<Object>;
		toc: Array<TocElement>;

		parse(): void;

		getChapter(chapterId: string, callback: (error: Error, text: string) => void): void;

		getChapterRaw(chapterId: string, callback: (error: Error, text: string) => void): void;

		getImage(id: string, callback: (error: Error, data: Buffer, mimeType: string) => void): void;

		getFile(id: string, callback: (error: Error, data: Buffer, mimeType: string) => void): void;
	}

	export = EPub;
}
*/

function array_unique(array: any[])
{
	return array.filter(function (el, index, arr)
	{
		return index == arr.indexOf(el);
	});
}
