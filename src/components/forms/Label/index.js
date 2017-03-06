import React from 'react';

const Label = ({children, ...other}) => (
  <label {...other}>{children}</label>
)

export default Label
