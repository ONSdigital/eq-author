import React from 'react'
import styled from 'styled-components'

const Grid = styled.div`
  display: flex;
  width: 100%;
`

export default ({children}) => (
  <Grid>{children}</Grid>
)
