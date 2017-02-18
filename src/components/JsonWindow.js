import React, {Component} from 'react'
import './JsonWindow.css'

export default class JsonWindow extends Component {
  render() {
    const { description, id, number, title, type, guidanceTitle, guidanceText, answers } = this.props.question
    return (
      <div className="json-window">
        <div className="json--description">'description': {description},</div>
        <div className="json--id">'id': {id},</div>
        <div className="json--number">'number': {number},</div>
        <div className="json--title">'title': {title},</div>
        <div className="json--type">'type': {type},</div>
        <div className="json--guidanceTitle">'guidanceTitle': {guidanceTitle},</div>
        <div className="json--guidanceText">'guidanceText': {guidanceText},</div>
        <div className="json--answers">'answers': [{answers}]</div>
      </div>
    )
  }
}
