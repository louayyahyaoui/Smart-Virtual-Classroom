import * as R from 'ramda';

/**
 * Read the file `url`, in case it matches a base64 url.
 *
 * @param  {Object} file
 * @return {Object}
 */
const getFileDataInBase64 = R.compose(
  R.prop('groups'),
  R.match(/^data:(?<mimeType>[a-z]+\/[a-z]+);base64,(?<data>.*)/),
  R.propOr('', 'url'),
);

/**
 * Get the `file` from the properties, in the correct format.
 *
 * @param {Object} props
 */
const getFileProp = props => {
  // Check if the file url is base64.
  if (getFileDataInBase64(props.file)) {
    // Update the file to include the data and mimeType extracted from the url.
    return getFileDataInBase64(props.file);
  }

  return props.file;
};

export default getFileProp;
