import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import CustomPropTypes from "custom-prop-types";
import DeleteButton from "components/DeleteButton";
import TextAnswer from "components/Answers/TextAnswer";
import MultipleChoiceAnswer from "components/Answers/MultipleChoiceAnswer";
import { TEXTFIELD, CHECKBOX, RADIO } from "constants/answer-types";
import Tooltip from "components/Tooltip";

export const AnswerDeleteButton = styled(DeleteButton)`
  position: absolute;
  right: .8em;
  top: .7em;
  padding: 0;
`;

class AnswerEditor extends React.Component {
  handleDeleteAnswer = () => {
    this.props.onDeleteAnswer(this.props.answer.id);
  };

  renderAnswer(answer) {
    switch (answer.type) {
      case TEXTFIELD:
        return <TextAnswer {...this.props} />;
      case CHECKBOX:
        return <MultipleChoiceAnswer type={CHECKBOX} {...this.props} />;
      case RADIO:
        return <MultipleChoiceAnswer type={RADIO} {...this.props} />;
      default:
        return null;
    }
  }

  render() {
    return (
      <div>
        {this.renderAnswer(this.props.answer)}
        <Tooltip content="Delete answer">
          <AnswerDeleteButton
            onClick={this.handleDeleteAnswer}
            aria-label="Delete answer"
          />
        </Tooltip>
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
  onDeleteOption: PropTypes.func.isRequired
};

export default AnswerEditor;
