import * as R from 'ramda';
import { extension } from 'mime-types';

const DEFAULT_NAME = 'download.pdf';

/**
 * Get the name to download this file.
 *
 * @param  {Object} file
 * @return {String}
 */
const getFilename = R.cond([
  [R.has('name'), R.prop('name')],
  [R.has('mimeType'), R.o(extension, R.prop('mimeType'))],
  [R.T, R.always(DEFAULT_NAME)],
]);

export default getFilename;
