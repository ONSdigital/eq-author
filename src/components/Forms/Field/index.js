import React, { Children, cloneElement } from 'react'

import styled from 'styled-components'

const Field = styled.div`
  display: block;
  width: 100%;
  margin-bottom: 2em;
`

export default ({children, ...otherProps}) =>
  <Field>
    {Children.map(children, child => cloneElement(child, otherProps))}
  </Field>
