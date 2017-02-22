import React, { Component } from 'react'

import Field from './Field.js'
import Input from './Input.js'
import Label from './Label.js'
import TextArea from './TextArea.js'
import Checkbox from './Checkbox.js'
import RichTextArea from './RichTextArea.js'

export default class ResponseFields extends Component {

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
              <TextArea value={JSON.stringify(options, null, 2)} name="options" rows="10"/>
          </Field>
          <Field>
              <Label htmlFor="description">Response Description</Label>
              <Input value={description} name="description"/>
          </Field>
          <Field>
              <Label htmlFor="validation-message">Validation Message</Label>
              <Input value={validationMessage} name="validation.messages.MANDATORY"/>
          </Field>
      </div>
    )
  }
}
