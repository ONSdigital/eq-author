import React, {Component} from 'react';

export default class TabTitle extends Component {
  defaultProps = {
    selected: false
  }
  onClickLink = (e) => {
    e.preventDefault()
  }
  render() {
    return (
      <li className='tabs-title' style={this.props.style} onClick={this.props.onClick}>
        <a onClick={this.onClickLink} aria-selected={this.props.selected}>{this.props.children}</a>
      </li>
    );
  }
}
