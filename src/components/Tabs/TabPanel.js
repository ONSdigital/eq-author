import React, {Component} from 'react'

export default class TabPanel extends Component {
  defaultProps = {
    visible: true
  }
  render() {
    return (
      <div className="tabs-panel" aria-hidden={!this.props.visible}>
        {this.props.children}
      </div>
    );
  }
}
