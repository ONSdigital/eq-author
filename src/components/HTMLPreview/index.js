import React from 'react'

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
          <div>
            {question.guidance.text.split('\n').map((item, key) =>
              <p key={key}>{item}</p>)}
          </div>
        </div>
    }
    {answers.map((answer, index) => (
      <div id={answer.id} key={index}>
        <p>{answer.description}</p>
        <div>{answer.mandatory && <p><small><strong>This answer is mandatory</strong></small></p>}</div>
        <div dangerouslySetInnerHTML={{__html: answer.guidance}}></div>
        <div>
          {answer.options.map((option, index) => (
            <div key={index}>
              <label>
                <input type="checkbox" value={option.value} />
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
)

export default HTMLPreview;
