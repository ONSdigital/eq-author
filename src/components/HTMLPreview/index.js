import React from 'react'

import * as AnswerTypes from 'components/AnswerTypes'

const HTMLPreview = ({question, answers}) => (
  <div id={question.id}>
    <h3>
      {
        question.number.length > 0 &&
          <span>{question.number}. </span>
      }
      {question.title}
    </h3>
    {
      (question.guidance.title || question.guidance.text) &&
        <div className="callout secondary">
          <h4>{question.guidance.title}</h4>
          <div dangerouslySetInnerHTML={{__html: question.guidance.text}} />
        </div>
    }
    {answers.map((answer, index) => {
      if (answer.type === "") {
        return false
      }
      const AnswerType = AnswerTypes[answer.type]
      return (
        <div id={answer.id} key={index}>
          <p>{answer.description}</p>
          <div>{answer.mandatory && <p><small><strong>This answer is mandatory</strong></small></p>}</div>
          {(answer.guidance.length > 0) &&
            <div className="callout" dangerouslySetInnerHTML={{__html: answer.guidance}} />}
          <AnswerType {...answer} />
        </div>
      )
    })}
  </div>
)

export default HTMLPreview;
