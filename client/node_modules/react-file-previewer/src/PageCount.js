import React from 'react';

const PageCount = ({ current, total }) => (
  <span className="preview-pagecount">
    {current + 1} of {total}
  </span>
);

export default PageCount;
