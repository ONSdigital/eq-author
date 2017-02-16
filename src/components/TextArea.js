import React, {Component} from 'react'

export default class TextArea extends Component {
  render() {
    const {name, id} = this.props
    return (
      <textarea rows="10" cols="50" id={id} name={name} defaultValue={this.props.value} />
    )
  }
}
