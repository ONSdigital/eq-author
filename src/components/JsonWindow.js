import React, {Component} from 'react'
import './JsonWindow.css'

export default class JsonWindow extends Component {
  render() {
    const jsonstring = JSON.stringify(this.props.question, null, 2)
    return (
      <div className="json-window">
        <pre className="json-window-code">
          {jsonstring}
        </pre>
      </div>
    )
  }
}
