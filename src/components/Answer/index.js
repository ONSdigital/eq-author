import React, { Component } from 'react'

import Field from 'components/forms/Field'
import Input from 'components/forms/Input'
import Label from 'components/forms/Label'
import Checkbox from 'components/forms/Checkbox'
import RichTextArea from 'components/forms/RichTextArea'
import Select from 'components/forms/Select'
import Options from 'components/Options'

export const ANSWER_TYPES = [
  "Checkbox",
  "Currency",
  "Date",
  "Integer",
  "Percentage",
  "Radio",
  "TextArea",
  "TextField",
]

export default class AnswerFields extends Component {

  handleChange = e => {
    const { name, value, type, checked} = e.target
    switch (type) {
      case 'checkbox':
        this.props.onChangeAnswer(this.props.answerIndex, {[name]: checked})
        break
      default:
        this.props.onChangeAnswer(this.props.answerIndex, {[name]: value})
    }
    if (e.stopPropagation) {
      e.stopPropagation()
    }
  }

  renderAnswerOpts = () => {
    const { options, type } = this.props.answer;
    if (type === 'Checkbox' || type === 'Radio') {
      return (
        <Options index={this.props.answerIndex} options={options} onChange={this.props.onChangeAnswerOptions} />
      )
    }
  }

  render () {
    const {id, mandatory, guidance, description, type, label} = this.props.answer
    return (
      <fieldset onChange={this.handleChange}>

          <Field id="answer-type">
              <Label>Answer Type</Label>
              <Select value={type} options={ANSWER_TYPES} name="type" />
          </Field>

          <Field id="answer-id">
              <Label>Answer ID</Label>
              <Input value={id} name="id" />
          </Field>

          <Field id="mandatory">
              <Checkbox checked={mandatory}
                name="mandatory" onChange={this.handleChange} />
              <Label>Mandatory</Label>
          </Field>

          <Field id="description">
              <Label>Answer Description</Label>
              <Input value={description} name="description"/>
          </Field>

          <Field id="guidance">
              <Label>Answer Guidance</Label>
              <RichTextArea value={guidance} name="guidance" onChange={this.handleChange} />
          </Field>

          <Field id="label">
              <Label>Answer Label</Label>
              <Input value={label} name="label" />
          </Field>

          {this.renderAnswerOpts()}

      </fieldset>
    )
  }
}
