import React, {Component} from 'react';

export default class TabList extends Component {
  render() {
    return (
      <ul className="tabs" style={this.props.style}>{
        this.props.children.map((child, index) =>
          React.cloneElement(child, {
            selected: this.props.selectedTab === index,
            onClick: this.props.handleTabSelected.bind(this, index),
            key: index
          }))
      }</ul>
    );
  }
}
