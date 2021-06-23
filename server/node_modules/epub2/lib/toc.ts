/**
 * Created by user on 2018/3/18/018.
 */

import EPub from '../index';
import * as libEPub from '../epub';

export function fixToc(epub: EPub | libEPub)
{
	let manifest_keys = Object.keys(epub.manifest);

	epub.toc.forEach(function (toc, idx)
	{
		if (!epub.manifest[toc.id])
		{
			for (let k of manifest_keys)
			{
				let row = epub.manifest[k];

				if ((row.href == toc.href) || (row.href.replace(/#.+$/g, '') == toc.href.replace(/#.+$/g, '')))
				{
					toc.id = k;
				}
			}
		}
	});

	return epub;
}

import * as self from './toc';
export default self;

