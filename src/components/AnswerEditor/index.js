import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import CustomPropTypes from "custom-prop-types";
import DeleteButton from "components/DeleteButton";
import TextAnswer from "components/Answers/TextAnswer";
import CheckboxAnswer from "components/Answers/CheckboxAnswer";
import { TEXTFIELD, CHECKBOX } from "constants/answer-types";

export const AnswerDeleteButton = styled(DeleteButton)`
  position: absolute;
  right: .5em;
  top: .4em;
`;

class AnswerEditor extends React.Component {
  handleDeleteAnswer = () => {
    this.props.onDeleteAnswer(this.props.answer.id);
  };

  getRenderedAnswer(type) {
    switch (type) {
      case TEXTFIELD:
        return TextAnswer;
      case CHECKBOX:
        return CheckboxAnswer;
      default:
        return null;
    }
  }

  render() {
    const Answer = this.getRenderedAnswer(this.props.answer.type);

    const {
      onAddOption,
      onUpdateOption,
      onDeleteOption,
      onFocus,
      onUpdate,
      answer
    } = this.props;

    return (
      <div>
        <Answer
          answer={answer}
          onUpdate={onUpdate}
          onAddOption={onAddOption}
          onUpdateOption={onUpdateOption}
          onDeleteOption={onDeleteOption}
          onFocus={onFocus}
        />
        <AnswerDeleteButton
          onClick={this.handleDeleteAnswer}
          title="Delete answer"
          type="button"
        />
      </div>
    );
  }
}

AnswerEditor.propTypes = {
  answer: CustomPropTypes.answer,
  onUpdate: PropTypes.func.isRequired,
  onDeleteAnswer: PropTypes.func.isRequired,
  onAddOption: PropTypes.func.isRequired,
  onUpdateOption: PropTypes.func.isRequired,
  onDeleteOption: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
};

export default AnswerEditor;
