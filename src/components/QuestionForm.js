import React, {Component} from 'react'
import Field from './Field'
import Select from './Select'
import Input from './Input'
import Label from './Label'
import TextArea from './TextArea'
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
        <Field>
          <Label htmlFor="guidancetitle">Guidance Title</Label>
          <Input value={question.guidancetitle} id="guidancetitle" name="guidancetitle" />
        </Field>
        <Field>
          <Label htmlFor="guidancetext">Guidance Text</Label>
          <TextArea value={question.guidancetext} id="guidancetext" name="guidancetext" rows="10" />
        </Field>
        <hr />
        <ResponseList responses={responses} onChangeResponse={this.props.onChangeResponse} />

      </form>
    )
  }
}
