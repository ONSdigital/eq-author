import React, {Component} from 'react'
import './style.css'

export default class JsonWindow extends Component {
  render() {
    const jsonstring = JSON.stringify(this.props.question, null, 2)
    return (
      <div className="json-window">
        <pre>
          {jsonstring}
        </pre>
      </div>
    )
  }
}
