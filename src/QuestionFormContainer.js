import React, {Component} from 'react'

import Field from './Field.js'
import Select from './Select.js'
import Input from './Input.js'
import Label from './Label.js'

export default class QuestionFormContainer extends Component {
  handleChange = e => {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }
  render() {
    return (
      <form onChange={this.handleChange}>
        <Field>
          <Label htmlFor="question_type">Question Type</Label>
          <Select id="question_type" name="question_type" options={['Text', 'Numeric', 'Multiple - Radio', 'Multiple - Checkbox']} />
        </Field>
        <Field>
          <Label htmlFor="question_id">Question ID</Label>
          <Input id="question_id" name="question_id" />
        </Field>
        <Field>
          <Label htmlFor="question_number">Question Number</Label>
          <Input id="question_number" name="question_number" />
        </Field>
      </form>
    )
  }
}
