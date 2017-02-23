import React, {Component} from 'react'

export default class Input extends Component {
  render() {
    const {name, id} = this.props
    return (
      <input type="text" id={id} name={name} defaultValue={this.props.value} {...this.props} />
    )
  }
}
