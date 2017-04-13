import React, { Children, cloneElement } from 'react'

import styled from 'styled-components'

const Field = styled.div`
  display: block;
  width: 100%;
`

export default ({children, ...otherProps}) =>
  <Field>
    {Children.map(children, child => cloneElement(child, otherProps))}
  </Field>
