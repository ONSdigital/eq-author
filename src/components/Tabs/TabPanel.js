import React, {Component} from 'react'

export default class TabPanel extends Component {
  defaultProps = {
    visible: true
  }
  render() {
    return (
      <div className="tabs-panel" style={this.props.style} aria-hidden={!this.props.visible}>
        {this.props.children}
      </div>
    );
  }
}
