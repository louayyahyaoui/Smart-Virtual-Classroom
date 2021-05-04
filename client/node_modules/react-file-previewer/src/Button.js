import React from 'react';

const Button = ({ children, onClick, disabled }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className="preview-button"
  >
    {children}
  </button>
);

export default Button;
