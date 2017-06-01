import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "proptypes";
import styled from "styled-components";
import Section from "./Section";
import Question from "./Question";
import Answer from "./Answer";

const StyledHTMLPreview = styled.div`
  background: white;
  color: #222;
  padding: 2rem 7rem;
  position: relative;
  z-index: 0;
`;

const HTMLPreview = ({ surveyItems, selectedSection }) => {
  if (!selectedSection) {
    return null;
  }
  return (
    <StyledHTMLPreview>
      <Section key={selectedSection.id} section={selectedSection}>
        {selectedSection.questions &&
          selectedSection.questions.map(questionId => {
            const question = surveyItems.questions[questionId];
            return (
              question &&
              question.title &&
              <Question key={questionId} question={question}>
                {question.answers &&
                  question.answers.map(answerId => {
                    const answer = surveyItems.answers[answerId];
                    return (
                      answer &&
                      answer.label &&
                      <Answer key={answerId} answer={answer} />
                    );
                  })}
              </Question>
            );
          })}
      </Section>
    </StyledHTMLPreview>
  );
};

HTMLPreview.propTypes = {
  surveyItems: PropTypes.objectOf(PropTypes.object),
  selectedSection: CustomPropTypes.section
};

export default HTMLPreview;
