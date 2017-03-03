import React, {Component} from 'react'

export default class Checkbox extends Component {
  render() {
    const { checked, ...otherProps } = this.props

    return (
      <input type="checkbox" checked={checked} {...otherProps} />
    )
  }
}
