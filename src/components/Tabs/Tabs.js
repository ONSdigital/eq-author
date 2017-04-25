import React, {Component} from 'react'
import styled from 'styled-components'

import TabPanel from './TabPanel'
import TabList from './TabList'


const Tabs = styled.div`

`

const TabsContent = styled.div`
  border: 1px solid ${props => props.theme.colorBorders};
  overflow: hidden;
`

export default class extends Component {
  state = {
    selected: this.props.selected || 0
  }
  getComponentWithProps = (child, index) => {
    const props = {
      [TabList]: {
        selectedTab: this.state.selected,
        handleTabSelected: index => {
          this.setState({
            selected: index
          })
        },
      },
      [TabPanel]: {
        visible: this.state.selected === index
      }
    }
    return React.cloneElement(child, {
      ...props[child.type],
      key: index
    })
  }
  render() {
    const { children } = this.props
    return (
      <Tabs>
        {children
          .filter(child => child.type.displayName === 'TabList')
          .map(this.getComponentWithProps)
        }
        <TabsContent>
          {children
            .filter(child => child.type.displayName === 'TabPanel')
            .map(this.getComponentWithProps)
          }
        </TabsContent>
      </Tabs>
    );
  }
}
