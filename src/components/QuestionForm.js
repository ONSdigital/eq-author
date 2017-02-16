import React, {Component} from 'react'

import Field from './Field.js'
import Select from './Select.js'
import Input from './Input.js'
import Label from './Label.js'

export default class QuestionForm extends Component {
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
          <Label htmlFor="type">Question Type</Label>
          <Select id="type" name="type" options={['Text', 'Numeric', 'Multiple - Radio', 'Multiple - Checkbox']} />
        </Field>
        <Field>
          <Label htmlFor="id">Question ID</Label>
          <Input id="id" name="id" />
        </Field>
        <Field>
          <Label htmlFor="number">Question Number</Label>
          <Input id="number" name="number" />
        </Field>
      </form>
    )
  }
}
