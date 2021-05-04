import React from 'react';
import PropTypes from 'prop-types';

import PreviewBarLeft from './PreviewBarLeft';
import PreviewBarRight from './PreviewBarRight';

const PreviewBar = props => {
  if (props.hidden) {
    return null;
  }

  return (
    <div className="preview-bar">
      <PreviewBarLeft
        onPageUp={props.onPageUp}
        onPageDown={props.onPageDown}
        totalPages={props.totalPages}
        currentPage={props.currentPage}
      />

      <PreviewBarRight
        onRotate={props.onRotate}
        onDownload={props.onDownload}
      />
    </div>
  );
};

PreviewBar.propTypes = {
  onPageUp: PropTypes.func.isRequired,
  onRotate: PropTypes.func.isRequired,
  onPageDown: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  hidden: PropTypes.bool,
};

export default PreviewBar;
