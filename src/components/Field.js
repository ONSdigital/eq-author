import React, {Component} from 'react'

export default class Field extends Component {
  render() {
    const {children} = this.props
    return (
      <div className="field">
        {children}
      </div>
    )
  }
}
