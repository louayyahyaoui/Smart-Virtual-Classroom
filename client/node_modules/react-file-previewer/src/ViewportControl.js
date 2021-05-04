import React from 'react';
import PropTypes from 'prop-types';
import PlusBox from 'mdi-material-ui/PlusBox';
import MinusBox from 'mdi-material-ui/MinusBox';
import ArrowExpandHorizontal from 'mdi-material-ui/ArrowExpandHorizontal';

import Button from './Button';

const ViewportControl = props => {
  if (props.hidden) {
    return null;
  }

  return (
    <div className="preview-icons">
      <Button onClick={props.onZoomIn}>
        <PlusBox />
      </Button>

      <Button onClick={props.onZoomOut} className="preview-icons">
        <MinusBox />
      </Button>

      <Button onClick={props.onFitToScreen} className="preview-icons">
        <ArrowExpandHorizontal />
      </Button>
    </div>
  );
};

ViewportControl.propTypes = {
  onZoomIn: PropTypes.func.isRequired,
  onZoomOut: PropTypes.func.isRequired,
  onFitToScreen: PropTypes.func.isRequired,
  hidden: PropTypes.bool,
};

export default ViewportControl;
