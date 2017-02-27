import React, {Component} from 'react'

export default class TextArea extends Component {
  render() {
    const {value, ...otherProps} = this.props
    return (
      <textarea defaultValue={value} {...otherProps}></textarea>
    )
  }
}
