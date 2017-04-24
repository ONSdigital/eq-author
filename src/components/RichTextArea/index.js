import React, {Component} from 'react'
import RichTextEditor from 'react-rte'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 1em;
`

const RichTextArea = styled(RichTextEditor)`
  width: 100%;
`

const toolbarConfig = {
  display: [
      'INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS'
  ],
  INLINE_STYLE_BUTTONS: [
    {
      label: 'Bold',
      style: 'BOLD',
      className: 'custom-css-class'
    }, {
      label: 'Italic',
      style: 'ITALIC'
    }
  ],
  BLOCK_TYPE_BUTTONS: [
    {
      label: 'UL',
      style: 'unordered-list-item'
    }, {
      label: 'OL',
      style: 'ordered-list-item'
    }
  ]
}

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: RichTextEditor.createValueFromString(this.props.value, 'html')
    }
  }

  onChange = (value) => {
    this.setState({value})
    if (this.props.onChange) {
      this.props.onChange({target: {
        name: this.props.name,
        value: value.getEditorState().getCurrentContent().hasText() ?
          value.toString('html') : ''}})
    }

  }

  render() {
    return (
      <Wrapper>
        <RichTextArea className="rte" rows="10" value={this.state.value} toolbarConfig={toolbarConfig} onChange={this.onChange}/>
      </Wrapper>
    )
  }
}
