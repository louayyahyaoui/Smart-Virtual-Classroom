import React from 'react';
import PropTypes from 'prop-types';
import { Document, Page, pdfjs } from 'react-pdf';

import isPDF from './utils/isPDF';
import getFileProp from './utils/getFileProp';

const RenderPDF = ({ src }) => (
  <Document
    file={src}
    options={{
      cMapPacked: true,
      cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
    }}
  >
    <Page pageNumber={1} width={80} height={85} />
  </Document>
);

/**
 * `FilePreviewerThumbnail` react component.
 *
 * @param  {Object}   props
 * @param  {Object}   props.file
 * @param  {String}   props.file.url
 * @param  {String}   props.file.data
 * @param  {String}   props.file.mimeType
 * @param  {Function} props.onClick
 * @return {Object}
 */
const FilePreviewerThumbnail = props => {
  const file = getFileProp(props);
  const fileSrc = file.url || `data:${file.mimeType};base64,${file.data}`;

  return (
    <div
      style={props.style}
      onClick={props.onClick}
      className="thumbnail-wrapper"
    >
      {isPDF(file) ? <RenderPDF src={fileSrc} /> : <img src={fileSrc} />}
    </div>
  );
};

FilePreviewerThumbnail.propTypes = {
  file: PropTypes.shape({
    url: PropTypes.string,
    mimeType: PropTypes.string,
    data: PropTypes.string,
  }).isRequired,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

FilePreviewerThumbnail.defaultProps = {
  style: {},
  onClick: () => {},
};

export default FilePreviewerThumbnail;
