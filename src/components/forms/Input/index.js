import React, {Component} from 'react'

export default class Input extends Component {
  render() {
    const {value, ...otherProps} = this.props
    return (
      <input type="text" defaultValue={value} {...otherProps} />
    )
  }
}
