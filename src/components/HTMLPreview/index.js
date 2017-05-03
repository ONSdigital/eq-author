import React from 'react'
import styled from 'styled-components'
import Section from './Section'
import Question from './Question'
import Answer from './Answer'

const HTMLPreview = styled.div`
  background: white;
  color: #222;
  padding: 2rem 7rem;
  position: relative;
  z-index: 0;
`;

export default ({survey}) => (
  <HTMLPreview>
    {Object.keys(survey.sections).map(sectionId => {
      const section = survey.sections[sectionId]
      return (
        <Section key={section.id} section={section}>
          {survey.sections[sectionId].questions.map(questionId => {
            const question = survey.questions[questionId];
            return (
              <Question key={question.id} question={question}>
                {question.answers.map(answerId => {
                  const answer = survey.answers[answerId];
                  return (
                    <Answer key={answer.id} answer={answer}>
                    </Answer>
                  )
                })}
              </Question>
            )
          })}
        </Section>
      )
    })}
  </HTMLPreview>
)
