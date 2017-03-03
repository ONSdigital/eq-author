import React, {Component} from 'react'
import Field from 'components/forms/Field'
import Select from 'components/forms/Select'
import Input from 'components/forms/Input'
import Label from 'components/forms/Label'
import GuidanceFields from 'components/GuidanceFields'
import ResponseList from 'components/ResponseList'

export default class QuestionForm extends Component {
  handleChange = e => {
    const {name, value} = e.target
    this.props.onChangeQuestion({
      [name]: value
    })
  }

  render() {
    const { question } = this.props
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
        <ResponseList responses={question.answers}
          onChangeQuestion={this.props.onChangeQuestion}
          onChangeResponse={this.props.onChangeResponse}
          onRemoveOption={this.props.onRemoveOption}
          onAddOption={this.props.onAddOption} />

      </form>
    )
  }
}
