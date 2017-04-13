import React from 'react'
import styled from 'styled-components'

const Select = styled.select`
  padding: 1em;
`

export default ({options, value, ...otherProps}) =>
  <Select defaultValue={value} {...otherProps}>
    {options.map(opt => (<option key={opt}>{opt}</option>))}
  </Select>
