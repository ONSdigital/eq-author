import React from 'react'
import styled from 'styled-components'

const QuestionTitleNumber = styled.div`
  position: absolute;
  text-align: right;
  left: -6rem;
  width: 6rem;
  padding-right: 0.8rem;
  box-sizing: border-box;
`;

const QuestionTitle = styled.div`
  position: relative;
  font-size: 1.22222em;
  font-weight: 600;
  line-height: 1.4;
  margin: 0 0 1rem;
`;

const QuestionDescription = styled.div`
  position: relative;
  font-size: 1em;
  font-weight: 400;
  line-height: 1.4;
  margin: 0 0 1rem;
`;

const QuestionGuidance = styled.div`
  border: none;
  border-left: 8px solid #033e58;
  margin-left: -8px;
  color: #222;
  padding: 18px;
  padding: 1rem;
  position: relative;
  font-weight: 400;
  line-height: 1.4;
  margin: 0 0 1rem;
  background: #eff0f9;
`;

const QuestionGuidanceTitle = styled.div`
  position: relative;
  font-size: 1em;
  font-weight: 600;
  line-height: 1.4;
  margin: 0 0 1rem;
`;

const QuestionGuidanceUnorderedList = styled.ul`
  padding-left: 1.5rem;
  margin: 0 0 1rem;
`;

const QuestionGuidanceListItem = styled.li`
  font-size: 1em;
  font-weight: 400;
  line-height: 1.4;
  margin: 0 0 0.3rem;
`;

export default ({question, children}) => {
  return (
    <div>
      <QuestionTitle><QuestionTitleNumber>1.1. </QuestionTitleNumber>{question.label}</QuestionTitle>
      <QuestionDescription>{question.description}</QuestionDescription>
      <QuestionGuidance>
        {question.guidance.map(guidanceItem => {
          return (
            <div key={guidanceItem.title}>
              <QuestionGuidanceTitle>{guidanceItem.title}</QuestionGuidanceTitle>
              <QuestionGuidanceUnorderedList>
                {guidanceItem.list.map(listItem => {
                  return (
                    <QuestionGuidanceListItem key={listItem}>{listItem}</QuestionGuidanceListItem>
                  )
                })}
              </QuestionGuidanceUnorderedList>
            </div>
          )
        })}
      </QuestionGuidance>
      {children}
    </div>
  )
}