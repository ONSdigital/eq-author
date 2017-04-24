import React from 'react'
import styled from 'styled-components'

const TextArea = styled.textarea`

`

export default ({value, ...otherProps}) =>
  <TextArea defaultValue={value} {...otherProps} />
