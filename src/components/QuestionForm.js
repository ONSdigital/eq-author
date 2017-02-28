import React, {Component} from 'react'
import Field from './Field'
import Select from './Select'
import Input from './Input'
import Label from './Label'
import Checkbox from './Checkbox'
import GuidanceFields from './GuidanceFields'
import ResponseList from './ResponseList.js'

export default class QuestionForm extends Component {
  handleChange = e => {
    const {name, value} = e.target
    this.props.onChangeQuestion({
      [name]: value
    })
  }

  capitalize = str => {
    return str[0].toUpperCase() + str.slice(1)
  }

  deunderscore = str => {
    return str.replace(/_/g, ' ')
  }

  labelize = str => {
    return this.capitalize(this.deunderscore(str))
  }

  renderField = (field, fieldName) => {
    const fieldType = field.type

    switch(fieldType) {
      case 'string':
      case undefined:
        return (
          <Field key={fieldName}>
            <Label htmlFor={fieldName}>{this.labelize(fieldName)}</Label>
            <Input value="" name={fieldName} />
          </Field>
        )
      case 'boolean':
        return (
          <Field key={fieldName}>
              <Label htmlFor={fieldName}>{this.labelize(fieldName)}</Label>
              <Checkbox checked={fieldName} name={fieldName} />
          </Field>
        )
      case 'array':
        return this.renderFields(field, fieldName)
      default:
        if (field.hasOwnProperty('enum')) {
          return (
            <Field key={fieldName}>
              <Label htmlFor={fieldName}>{this.labelize(fieldName)}</Label>
              <Select id="type" name={fieldName} options={field.enum} />
            </Field>
          )
        }
        console.warn('TODO', 'Unhandled: ', field.type)
        return
    }
  }

  renderFields = (field, fieldName) => {
    switch(field.items.type) {
      case 'object':
        return (
          <div key={fieldName}>
            <h3>{this.labelize(fieldName)}</h3>
            {Object.getOwnPropertyNames(field.items.properties).map(name => (
              this.renderField(field.items.properties[name], name)
            ))}
          </div>
        )
      default:
        console.warn('TODO', 'Unhandled: ', field.items.type)
        return
    }
  }

  render() {
    const { question, schema } = this.props
    return (
      <form onChange={this.handleChange}>
        <h3>Required fields</h3>
            {
              schema.required.map(fieldName => (
                this.renderField(this.props.schema.properties[fieldName], fieldName)
              ))
            }
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
