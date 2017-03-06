import React from 'react';

const Label = ({children, id, ...other}) => (
  <label htmlFor={id} {...other}>{children}</label>
);

export default Label
