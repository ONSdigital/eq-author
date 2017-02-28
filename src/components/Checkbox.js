import React, {Component} from 'react'

export default class Checkbox extends Component {
  render() {
    const { checked, onChange, ...otherProps } = this.props

    return (
      <input type="checkbox" checked={checked} onChange={onChange} {...otherProps} />
    )
  }
}
