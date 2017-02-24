import React, {Component} from 'react'

import Field from './Field'
import Select from './Select'
import Input from './Input'
import Label from './Label'
import TextArea from './TextArea'
import Checkbox from './Checkbox'
import RichTextArea from './RichTextArea'
import GuidanceFields from './GuidanceFields'
import Answers from './Answers'

export default class Question extends Component {
  handleChange = e => {
    let {name, value} = e.target
    if (e.target.type === 'checkbox') {
      value = e.target.checked
    }
    this.props.onChange({
      key: name,
      value: value
    })
  }

  render() {
    const { id, number, title, guidance, answers } = this.props.question
    return (
      <form onChange={this.handleChange}>
        <h3>Question Settings</h3>
        <Field>
          <Label htmlFor="type">Question Type</Label>
          <Select id="type" name="type" options={['Text', 'Numeric', 'Multiple - Radio', 'Multiple - Checkbox']} />
        </Field>
        <Field>
          <Label htmlFor="question-id">Question ID</Label>
          <Input value={id} id="question-id" name="id" />
        </Field>
        <Field>
          <Label htmlFor="question-number">Question Number</Label>
          <Input value={number} id="question-number" name="number" />
        </Field>
        <Field>
          <Label htmlFor="question-title">Question Title</Label>
          <Input value={title} id="question-title" name="title" />
        </Field>

        <GuidanceFields guidance={guidance} />

        <hr />

        <h3>Answer Settings</h3>

        <Answers answers={answers} onChange={this.props.onChange} />

      </form>
    )
  }
}
