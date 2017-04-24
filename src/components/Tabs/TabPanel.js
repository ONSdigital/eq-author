import React from 'react'
import styled from 'styled-components'

const TabPanel = styled.div`
  background: white;
  width: 100%;
  padding: 2em;
  &[aria-hidden=true] {
    display: none;
  }
`

export default ({children, visible = true}) =>
  <TabPanel aria-hidden={!visible}>
    {children}
  </TabPanel>
