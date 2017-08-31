import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import CustomPropTypes from "custom-prop-types";
import Answer from "components/Answer";
import DeleteButton from "components/DeleteButton";

const AnswerDeleteButton = styled(DeleteButton)`
  position: absolute;
  right: .5em;
  top: .4em;
`;

const AnswerEditor = props => {
  return (
    <div>
      <Answer
        answer={props.answer}
        answerIndex={props.answerIndex}
        onChange={props.onChange}
        onAddOption={props.onAddOption}
        onDeleteOption={props.onDeleteOption}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        onEntered={props.onEntered}
      />
      <AnswerDeleteButton
        onClick={function() {
          props.onDeleteAnswer(props.answer.id);
        }}
        title="Delete answer"
        type="button"
      />
    </div>
  );
};

AnswerEditor.propTypes = {
  answer: CustomPropTypes.answer,
  answerIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onAddOption: PropTypes.func.isRequired,
  onDeleteOption: PropTypes.func.isRequired,
  onDeleteAnswer: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onEntered: PropTypes.func.isRequired
};

export default AnswerEditor;
