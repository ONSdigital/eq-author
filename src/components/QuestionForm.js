import React, {Component} from 'react'

import Field from './Field.js'
import Select from './Select.js'
import Input from './Input.js'
import Label from './Label.js'

export default class QuestionForm extends Component {
  handleChange = e => {
    const {name, value} = e.target
    this.props.onChange({
      [name]: value
    })
  }

  render() {
    const { id, number, title } = this.props.question
    return (
      <form onChange={this.handleChange}>
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
        <Field>
          <Label htmlFor="guidance-title">Question Guidance Title</Label>
          <Input value="" id="question-guidance-title" name="guidance-title" />
        </Field>
      </form>
    )
  }
}
