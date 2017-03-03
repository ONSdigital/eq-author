import React, { Component } from 'react'

import AnswerFields from 'components/AnswerFields'

export default class AnswerList extends Component {
  render () {
    return (
      <div className="answer-list">
        { this.props.answers.map(answer => (<AnswerFields
              answer={answer}
              key={this.props.answers.indexOf(answer)}
              answerIndex={this.props.answers.indexOf(answer)}
              onChangeAnswer={this.props.onChangeAnswer}
              onChangeQuestion={this.props.onChangeQuestion}
              onRemoveOption={this.props.onRemoveOption}
              onAddOption={this.props.onAddOption} />
        ))}
      </div>
    )
  }
}
