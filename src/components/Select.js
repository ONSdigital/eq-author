import React, {Component} from 'react';

export default class Select extends Component {
  constructor(props) {
     super(props)
  }
  handleChange = (e) => {
    // this.setState({value: e.target.value})
  }
  renderOptions() {
    return this.props.options.map(opt => <option value={opt} key={opt}>{opt}</option>)
  }
  render() {
    const {name, id} = this.props
    return (
      <select name={name} id={id} value={this.props.value} onChange={this.handleChange}>
        {this.renderOptions()}
      </select>)
  }
}
