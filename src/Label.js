import React, {Component} from 'react';

export default class Label extends Component {
  render() {
    return (<label {...this.props}>{this.props.children}</label>)
  }
}
