import React, {Component} from 'react'

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''}
  }

  handleChange = (e) => {
    this.setState({value: e.target.value})
  }

  render() {
    const {name, id} = this.props
    return (
      <input type="text" id={id} name={name} value={this.state.value} onChange={this.handleChange} />
    )
  }
}
