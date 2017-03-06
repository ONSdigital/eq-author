import React, {Component} from 'react';

export default class Label extends Component {
  render() {
    const {id, ...otherProps} = this.props;
    return (<label htmlFor={id} {...otherProps}>{this.props.children}</label>)
  }
}
