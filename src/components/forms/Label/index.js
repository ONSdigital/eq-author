import React from 'react'
import styled from 'styled-components'

const Label = styled.label`
  display: block;
  font-size: 0.9em;
  margin-bottom: 0.2em;
  font-weight: 600;
`

export default ({id, children, ...otherProps}) =>
  <Label htmlFor={id} {...otherProps}>{children}</Label>
