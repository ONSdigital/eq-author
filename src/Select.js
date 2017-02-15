import React, {Component} from 'react';

export default class Select extends Component {
  renderOptions() {
    return this.props.options.map(opt => <option value={opt} key={opt}>{opt}</option>)
  }
  render() {
    const {name, id} = this.props
    return (
      <select name={name} id={id}>
        {this.renderOptions()}
      </select>)
  }
}
