import React, {Component} from 'react'
import RichTextEditor from 'react-rte'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  min-height: 250px;
  font-family: sans-serif;
  margin-bottom: 16px;
`;

const RTE = styled(RichTextEditor)`
  width:100%;
`;

export default class RichTextArea extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: RichTextEditor.createValueFromString(this.props.value, 'html')
    }
  }

  onChange = (value) => {
    this.setState({value})
    this.props.onChange({target: {name: this.props.name, value: value.toString('html')}})
  }

  render() {
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

    return (
      <Wrapper>
        <RTE className="rte" value={this.state.value} toolbarConfig={toolbarConfig} onChange={this.onChange}/>
      </Wrapper>
    )
  }
}
