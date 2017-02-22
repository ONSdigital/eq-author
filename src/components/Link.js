import React, {Component} from 'react'

export default class Link extends Component {
  render() {
    const {text} = this.props
    return (
      <a>{text}</a>
    )
  }
}
