import React, {Component} from 'react'

import Field from './Field'
import Input from './Input'
import Label from './Label'
import Checkbox from './Checkbox'
import RichTextArea from './RichTextArea'
import Options from './Options'

export default class Answers extends Component {
  render() {
    const {answers} = this.props
    return (
      <div>
        {answers.map((answer, index) => (
          <div key={index}>
            <Field>
              <Label htmlFor={`answers-${index}-id`}>Answer Id</Label>
              <Input value={answer.id} id={`answers-${index}-id`} name={`answers[${index}].id`} />
            </Field>
            <Field>
              <Label htmlFor={`answers-${index}-mandatory`}>Mandatory</Label>
              <Checkbox defaultChecked={answer.mandatory} id={`answers-${index}-mandatory`} name={`answers[${index}].mandatory`} />
            </Field>
            <Field>
              <Label htmlFor={`answers-${index}-guidance`}>Answer Guidance</Label>
              <RichTextArea onChange={this.props.onChange} value={answer.guidance} id={`answers-${index}-guidance}`} name={`answers[${index}].guidance`} rows="10" />
            </Field>

            <Options options={answer.options} onChange={this.props.onChange}/>

            <Field>
              <Label htmlFor={`answers-${index}-description`}>Answer Description</Label>
              <Input value={answer.description} id={`answers-${index}-description`} name={`answers[${index}].description`} />
            </Field>
          </div>
        ))}
      </div>
    )
  }
}
