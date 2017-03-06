import React, {Component} from 'react'
import Field from 'components/forms/Field'
import Select from 'components/forms/Select'
import Input from 'components/forms/Input'
import Label from 'components/forms/Label'
import GuidanceFields from 'components/GuidanceFields'
import AnswerList from 'components/AnswerList'
import {Tabs, TabPanel, TabList, TabTitle} from 'components/Tabs'

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
        <Tabs>
          <TabList>
            <TabTitle>Question</TabTitle>
            <TabTitle>Answers</TabTitle>
          </TabList>
          <TabPanel>
            <Field id="question-type">
              <Label>Question Type</Label>
              <Select name="type" options={['Text', 'Numeric', 'Multiple - Radio', 'Multiple - Checkbox']} />
            </Field>
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
            <GuidanceFields guidance={question.guidance} />
          </TabPanel>
          <TabPanel>
            <AnswerList answers={question.answers}
              onChangeQuestion={this.props.onChangeQuestion}
              onChangeAnswer={this.props.onChangeAnswer}
              onRemoveOption={this.props.onRemoveOption}
              onAddOption={this.props.onAddOption} />
          </TabPanel>
        </Tabs>
      </form>
    )
  }
}
