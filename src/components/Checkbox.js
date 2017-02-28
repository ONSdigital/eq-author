import React, {Component} from 'react'

export default class Checkbox extends Component {
  render() {
    const { defaultChecked, checked, onChange, ...otherProps } = this.props

    return (
      <input type="checkbox" defaultChecked={defaultChecked}
        checked={checked} onChange={onChange} {...otherProps} />
    )
  }
}
