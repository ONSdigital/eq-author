import React from 'react'
import styled from 'styled-components'

const TabListStyle = styled.ul`
  list-style: none;
  margin: 0 0 -1px;
  padding: 0;
  display: flex;
  flex-direction: row;
`

const TabList = (props) =>
  <TabListStyle> {
    props.children.map((child, index) =>
      React.cloneElement(child, {
        selected: props.selectedTab === index,
        onClick: props.handleTabSelected.bind(this, index),
        key: index
      }))
    }
  </TabListStyle>

TabList.defaultProps = {
  displayName: 'TabList'
}

export default TabList
