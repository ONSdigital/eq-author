import React, {Component} from 'react'
import Field from 'components/forms/Field'
import Input from 'components/forms/Input'
import Label from 'components/forms/Label'
import RichTextArea from 'components/forms/RichTextArea'

export default class Question extends Component {
  handleChange = e => {
    const {name, value} = e.target
    this.props.changeQuestion({
      [name]: value
    })
  }

  render() {
    const { question } = this.props
    return (
      <fieldset onChange={this.handleChange}>
        <legend>Question</legend>
        <Field id="id">
          <Label>Question ID</Label>
          <Input value={question.id} name="id" />
        </Field>
        <Field id="number">
          <Label>Question Number</Label>
          <Input value={question.number} name="number" />
        </Field>
        <Field id="title">
          <Label>Question Title</Label>
          <Input value={question.title} name="title" />
        </Field>
        <Field>
          <Label htmlFor="guidancetitle">Guidance Title</Label>
          <Input value={question.guidance.title} id="guidancetitle" name="guidance.title" />
        </Field>
        <Field>
          <Label htmlFor="guidancetext">Guidance Text</Label>
          <RichTextArea onChange={this.handleChange} value={question.guidance.text} id="guidancetext" name="guidance.text" rows="10" />
        </Field>
      </fieldset>
    )
  }
}
