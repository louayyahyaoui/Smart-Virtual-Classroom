import React from 'react';
import PropTypes from 'prop-types';

import isPDF from './utils/isPDF';
import PDFViewer from './PDFViewer';
import ImageViewer from './ImageViewer';

const ViewportContent = ({
  file,
  totalPages,
  containerRef,
  onPageChange,
  originalSizes,
  onLoadSuccess,
}) => (
  <div ref={containerRef} className={'preview-content'}>
    <div className="preview-file">
      {isPDF(file) ? (
        <PDFViewer
          file={file}
          totalPages={totalPages}
          onPageChange={onPageChange}
          onLoadSuccess={onLoadSuccess}
        />
      ) : (
        <ImageViewer
          file={file}
          onLoadSuccess={onLoadSuccess}
          originalSizes={originalSizes}
        />
      )}
    </div>
  </div>
);

ViewportContent.propTypes = {
  file: PropTypes.shape({
    url: PropTypes.string,
    data: PropTypes.string,
    name: PropTypes.string,
    mimeType: PropTypes.string,
  }),
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  onLoadSuccess: PropTypes.func.isRequired,
};

export default ViewportContent;
