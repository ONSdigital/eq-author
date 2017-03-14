import React, {Component} from 'react'
import Label from 'components/forms/Label'
import Field from 'components/forms/Field'
import TextArea from 'components/forms/TextArea'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-bottom: 16px;
`;

export default class Options extends Component {
  handleChange = e => {
    e.stopPropagation()
    const options = e.target.value.split('\n')
      .filter(value => value.length > 0)
      .map(value => ({
        label: value,
        value: value.replace(/\s+/g, '-').toLowerCase()
      }))
    this.props.onChange(this.props.index, options)
  }

  render() {
    const {options} = this.props
    const value = options.map(option => option.value).join('\n')
    return (
      <Wrapper>
        <Field>
          <Label>Answer Options</Label>
          <TextArea value={value} rows={options.length + 1} onChange={this.handleChange}/>
        </Field>
      </Wrapper>
    )
  }
}
