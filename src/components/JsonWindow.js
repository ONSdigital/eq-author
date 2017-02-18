import React, {Component} from 'react'
import './JsonWindow.css'

export default class JsonWindow extends Component {
  render() {
    return (
      <div className="json-window">{this.props.json}</div>
    )
  }
}
