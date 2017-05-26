import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "proptypes";
import styled from "styled-components";

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

const Question = ({ question, children }) => {
  return (
    <div>
      <QuestionTitle>
        <QuestionTitleNumber>1.1. </QuestionTitleNumber>{question.title}
      </QuestionTitle>
      <QuestionDescription>{question.description}</QuestionDescription>
      {question.guidance &&
        question.guidance.length > 0 &&
        <QuestionGuidance>
          {question.guidance.map(guidanceItem => {
            return (
              <div key={guidanceItem.title}>
                <QuestionGuidanceTitle>
                  {guidanceItem.title}
                </QuestionGuidanceTitle>
                <QuestionGuidanceUnorderedList>
                  {guidanceItem.list &&
                    guidanceItem.list.map(listItem => (
                      <QuestionGuidanceListItem key={listItem}>
                        {listItem}
                      </QuestionGuidanceListItem>
                    ))}
                </QuestionGuidanceUnorderedList>
              </div>
            );
          })}
        </QuestionGuidance>}
      {children}
    </div>
  );
};

Question.propTypes = {
  question: CustomPropTypes.question,
  children: PropTypes.arrayOf(PropTypes.object)
};

export default Question;
