import React, {Component} from 'react'

import Field from './Field'
import Select from './Select'
import Input from './Input'
import Label from './Label'
import TextArea from './TextArea'
import Checkbox from './Checkbox'
import RichTextArea from './RichTextArea'
import GuidanceFields from './GuidanceFields'

export default class QuestionForm extends Component {
  handleChange = e => {
    const {name, value} = e.target
    this.props.onChange({
      [name]: value
    })
  }

  render() {
    const { id, number, title, guidance } = this.props.question
    return (
      <form onChange={this.handleChange}>
        <h3>Question Settings</h3>
        <Field>
          <Label htmlFor="type">Question Type</Label>
          <Select id="type" name="type" options={['Text', 'Numeric', 'Multiple - Radio', 'Multiple - Checkbox']} />
        </Field>
        <Field>
          <Label htmlFor="id">Question ID</Label>
          <Input value={id} id="id" name="id" />
        </Field>
        <Field>
          <Label htmlFor="number">Question Number</Label>
          <Input value={number} id="number" name="number" />
        </Field>
        <Field>
          <Label htmlFor="title">Question Title</Label>
          <Input value={title} id="question-title" name="title" />
        </Field>

        <GuidanceFields guidance={guidance} />

        <hr />
        <h3>Response Settings</h3>
        <Field>
          <Label htmlFor="response-id">Response Id</Label>
          <Input value="" id="response-id" name="response-id" />
        </Field>
        <Field>
          <Label htmlFor="response-mandatory">Mandatory</Label>
          <Checkbox defaultChecked="checked" id="response-mandatory" name="response-mandatory" />
        </Field>
        <Field>
          <Label htmlFor="response-guidance">Response Guidance</Label>
          <RichTextArea value="" id="response-guidance" name="response-guidance" rows="10" />
        </Field>
        <Field>
          <Label htmlFor="response-options">Response Options</Label>
          <TextArea value="" id="response-options" name="response-options" rows="10" />
        </Field>
        <Field>
          <Label htmlFor="response-description">Response Description</Label>
          <Input value="" id="response-description" name="response-description" />
        </Field>
        <Field>
          <Label htmlFor="response-validation-message">Validation Message</Label>
          <Input value="" id="response-validation-message" name="response-validation-message" />
        </Field>
      </form>
    )
  }
}
