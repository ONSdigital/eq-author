import React, { Component } from 'react'

import Field from './Field.js'
import Input from './Input.js'
import Label from './Label.js'
import Checkbox from './Checkbox.js'
import RichTextArea from './RichTextArea.js'
import OptionsInputList from './OptionsInputList.js'

export default class ResponseFields extends Component {

  handleOriginalChange = e => {
    const { name, value } = e.target
    this.props.onChangeQuestion({[name]: value})
    e.stopPropagation()
  }

  handleChange = e => {
    const { name, value } = e.target
    this.props.onChangeResponse(this.props.responseIndex, {[name]: value})
    if (e.stopPropagation) {
      e.stopPropagation()
    }
  }

  handleChecked = e => {
    const { name, checked } = e.target
    this.props.onChangeResponse(this.props.responseIndex, {[name]: checked})
    if (e.stopPropagation) {
      e.stopPropagation()
    }
  }

  handleRemoveOption = e => {
    const optionIndex = e.target.name
    this.props.onRemoveOption(this.props.responseIndex, optionIndex)
    e.stopPropagation()
  }

  handleAddOption = e => {
    const {label, value, description} = e
    this.props.onAddOption(this.props.responseIndex, {
      label: label,
      value: value,
      description: description
    })
  }

  render () {
    const {id, mandatory, guidance, options, description, ...otherProps} = this.props.response
    const validationMessage = otherProps.validation.messages.MANDATORY

    return (
      <div onChange={this.handleChange}>
          <h3>Response {this.props.responseIndex + 1}</h3>
          <Field>
              <Label htmlFor="response-id">Response Id</Label>
              <Input value={id} name="id"/>
          </Field>
          <Field>
              <Label htmlFor="mandatory">Mandatory</Label>
              <Checkbox defaultChecked={mandatory} name="mandatory" onChange={this.handleChecked} />
          </Field>
          <Field>
              <Label htmlFor="guidance">Response Guidance</Label>
              <RichTextArea value={guidance} name="guidance" onChange={this.handleChange} />
          </Field>
          <Field>
              <Label htmlFor="options">Response Options</Label>
              <OptionsInputList options={options}
                onAddOption={this.handleAddOption}
                onRemoveOption={this.handleRemoveOption}
                emptyText="There are currently no options, add one below!" />
          </Field>
          <Field>
              <Label htmlFor="description">Response Description</Label>
              <Input value={description} name="description"/>
          </Field>
          <Field>
              <Label htmlFor="validation-message">Validation Message</Label>
              <Input onChange={this.handleOriginalChange} value={validationMessage} name="answers.0.validation.messages.MANDATORY"/>
          </Field>
      </div>
    )
  }
}
