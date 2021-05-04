import React from 'react';
import PropTypes from 'prop-types';
import Download from 'mdi-material-ui/Download';
import RotateRight from 'mdi-material-ui/RotateRight';

import Button from './Button';

const PreviewBarRight = props => (
  <div className="preview-bar-left">
    <Button onClick={props.onRotate}>
      <RotateRight />
    </Button>

    <Button onClick={props.onDownload}>
      <Download />
    </Button>
  </div>
);

PreviewBarRight.propTypes = {
  onRotate: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default PreviewBarRight;
