import React from 'react'
import styled from 'styled-components'

const TabPanelStyle = styled.div`
  background: white;
  width: 100%;
  padding: 2em;
  &[aria-hidden=true] {
    display: none;
  }
`

const TabPanel = ({children, visible = true}) =>
  <TabPanelStyle aria-hidden={!visible}>
    {children}
  </TabPanelStyle>

TabPanel.defaultProps = {
  displayName: 'TabPanel'
}

export default TabPanel
