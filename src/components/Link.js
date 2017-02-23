import React, {Component} from 'react'

export default class Link extends Component {
  render() {
    const {text, data} = this.props
    return (
      <a name={data} onClick={this.props.onClick}>{text}</a>
    )
  }
}
