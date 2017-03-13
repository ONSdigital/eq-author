import React from 'react';

const Select = ({options, value, ...rest}) => (
  <select defaultValue={value} {...rest}>
    {options.map(opt => (
      <option key={opt}>{opt}</option>
    ))}
  </select>
)

export default Select
