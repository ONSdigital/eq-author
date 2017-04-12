import React, { Component } from 'react'
import styled from 'styled-components'

const TreeNodeChildren = styled.div`
  color: white;
  font-size: 1em;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;
  overflow: hidden;
  height: ${props => props.open ? 'auto' : '0' };
`

export default class extends Component {
  static defaultProps = {
    open: true
  }

  constructor(props) {
    super(props)
    this.state = {
      open: props.open
    }
  }

  toggleOpen = e => {
    console.log(e);
    this.setState({ open: !this.state.open })
  }

  render() {
    const {children} = this.props
    return (
      <TreeNodeChildren open={this.state.open}>
        {children}
      </TreeNodeChildren>
    )}
}
