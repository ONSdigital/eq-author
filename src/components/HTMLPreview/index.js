import React from "react";
import styled from "styled-components";
import Section from "./Section";
import Question from "./Question";
import Answer from "./Answer";

const HTMLPreview = styled.div`
  background: white;
  color: #222;
  padding: 2rem 7rem;
  position: relative;
  z-index: 0;
`;

export default ({ survey, selectedId, selectedSection }) => {
  if (!selectedSection) {
    return null;
  }

  return (
    <HTMLPreview>
      <Section key={selectedSection.id} section={selectedSection}>
        {selectedSection.questions &&
          selectedSection.questions.map(questionId => {
            const question = survey.questions[questionId];
            return (
              question &&
              question.title &&
              <Question key={questionId} question={question}>
                {question.answers &&
                  question.answers.map(answerId => {
                    const answer = survey.answers[answerId];
                    return (
                      answer &&
                      answer.title &&
                      <Answer key={answerId} answer={answer} />
                    );
                  })}
              </Question>
            );
          })}
      </Section>
    </HTMLPreview>
  );
};
