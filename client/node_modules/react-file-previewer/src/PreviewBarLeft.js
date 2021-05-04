import React from 'react';
import PropTypes from 'prop-types';
import ChevronUp from 'mdi-material-ui/ChevronUp';
import ChevronDown from 'mdi-material-ui/ChevronDown';

import Button from './Button';
import PageCount from './PageCount';

const PreviewBarLeft = props => {
  return (
    <div className="preview-bar-left">
      {/* Page to go up means going back. */}
      <Button onClick={props.onPageUp} disabled={props.currentPage === 0}>
        <ChevronUp />
      </Button>

      {/* Page to go down means going next. */}
      <Button
        onClick={props.onPageDown}
        disabled={props.currentPage + 1 === props.totalPages}
      >
        <ChevronDown />
      </Button>

      <PageCount current={props.currentPage} total={props.totalPages} />
    </div>
  );
};

PreviewBarLeft.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageUp: PropTypes.func.isRequired,
  onPageDown: PropTypes.func.isRequired,
};

export default PreviewBarLeft;
