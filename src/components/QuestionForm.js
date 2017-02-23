import React, {Component} from 'react'
import Field from './Field'
import Select from './Select'
import Input from './Input'
import Label from './Label'
import GuidanceFields from './GuidanceFields'
import ResponseList from './ResponseList.js'

export default class QuestionForm extends Component {
  handleChange = e => {
    const {name, value} = e.target
    this.props.onChangeQuestion({
      [name]: value
    })
  }

  render() {
    const { question, responses } = this.props
    return (
      <form onChange={this.handleChange}>
        <h3>Question Settings</h3>
        <Field>
          <Label htmlFor="type">Question Type</Label>
          <Select id="type" name="type" options={['Text', 'Numeric', 'Multiple - Radio', 'Multiple - Checkbox']} />
        </Field>
        <Field>
          <Label htmlFor="id">Question ID</Label>
          <Input value={question.id} id="id" name="id" />
        </Field>
        <Field>
          <Label htmlFor="number">Question Number</Label>
          <Input value={question.number} id="number" name="number" />
        </Field>
        <Field>
          <Label htmlFor="title">Question Title</Label>
          <Input value={question.title} id="question-title" name="title" />
        </Field>
        <GuidanceFields guidance={question.guidance} />
        <hr />
        <ResponseList responses={responses}
          onChangeResponse={this.props.onChangeResponse}
          onRemoveOption={this.props.onRemoveOption}
          onAddOption={this.props.onAddOption} />

      </form>
    )
  }
}
