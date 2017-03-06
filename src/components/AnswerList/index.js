import React from 'react'
import AnswerFields from 'components/AnswerFields'

const AnswerList = ({answers, ...other}) => (
  <div className="answer-list">
    { answers.map((answer, index) => (<AnswerFields
          answer={answer}
          key={index}
          answerIndex={index}
          {...other} />
    ))}
  </div>
)
export default AnswerList
