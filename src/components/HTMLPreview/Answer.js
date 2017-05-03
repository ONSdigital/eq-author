import React from "react";
import styled from "styled-components";

const AnswerLabel = styled.div`
  position: relative;
  font-size: 1em;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 0.4rem;
  display: block;
`;

const AnswerDescription = styled.div`
  position: relative;
  font-size: 0.77778em;
  font-weight: 400;
  line-height: 1.4;
  margin-bottom: 0.4rem;
  display: block;
`;

const AnswerInput = styled.input`
  position: relative;
  z-index: 3;
  padding: 10.799px;
  padding: 0.6rem;
  display: block;
  color: inherit;
  font-size: 1em;
  border: 1px solid #999;
  border-radius: 3px;
  width: 100%;
  transition: border-color 200ms ease-in;
  margin-bottom: 2rem;
  max-width: 20rem;
`;

export default ({ answer }) => {
  return (
    <div>
      <AnswerLabel>
        {answer.label}
        <AnswerDescription>{answer.description}</AnswerDescription>
      </AnswerLabel>
      <AnswerInput />
    </div>
  );
};
