import React from 'react'
import Answer from 'components/Answer'

const Answers = ({answers, ...other}) => (
  <fieldset className="answer-list">
    <legend>Answers</legend>
    { answers.map((answer, index) => (
      <Answer answer={answer} key={index} answerIndex={index} {...other} />
    ))}
  </fieldset>
)
export default Answers
