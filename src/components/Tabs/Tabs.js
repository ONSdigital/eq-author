import React, {Component} from 'react'
import TabPanel from './TabPanel'
import TabList from './TabList'

export default class Tabs extends Component {
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
      <div>
        {children
          .filter(child => child.type === TabList)
          .map(this.getComponentWithProps)
        }
        <div className="tabs-content">
          {children
            .filter(child => child.type === TabPanel)
            .map(this.getComponentWithProps)
          }
        </div>
      </div>
    );
  }
}
