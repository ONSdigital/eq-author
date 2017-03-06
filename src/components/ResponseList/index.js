import React, { Component } from 'react'

import ResponseFields from 'components/ResponseFields'

export default class ResponseList extends Component {
  render () {
    return (
      <div className="response-list">
        { this.props.responses.map((response, index) => (
          <ResponseFields key={`response-${index}`}
              response={response}
              responseIndex={this.props.responses.indexOf(response)}
              onChangeResponse={this.props.onChangeResponse}
              onChangeQuestion={this.props.onChangeQuestion}
              onRemoveOption={this.props.onRemoveOption}
              onAddOption={this.props.onAddOption} />
        )) }
      </div>
    )
  }
}
