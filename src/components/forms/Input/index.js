import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
  padding: 0.5em 1em;
  display: block;
  &:focus {
    outline: none;
  }
`

export default ({type = 'text', value, ...otherProps}) =>
  <Input type={type} defaultValue={value} {...otherProps} />
