import React, {Component} from 'react'

export default class TextArea extends Component {
  render() {
    const {name, id, rows, cols, value} = this.props
    return (
      <textarea id={id} name={name} rows={rows} cols={cols} defaultValue={value}></textarea>
    )
  }
}
