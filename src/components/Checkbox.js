import React, {Component} from 'react'

export default class Checkbox extends Component {
  render() {
    return (
      <input type="checkbox" {...this.props} />
    )
  }
}
