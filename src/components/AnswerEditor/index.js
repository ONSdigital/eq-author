import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import CustomPropTypes from "custom-prop-types";
import DeleteButton from "components/DeleteButton";
import TextAnswer from "components/Answers/TextAnswer";
import NumberAnswer from "components/Answers/NumberAnswer";
import MultipleChoiceAnswer from "components/Answers/MultipleChoiceAnswer";
import DateRange from "components/Answers/DateRange";
import Date from "components/Answers/Date";
import {
  TEXTFIELD,
  NUMBER,
  CURRENCY,
  TEXTAREA,
  CHECKBOX,
  RADIO,
  DATE_RANGE,
  DATE
} from "constants/answer-types";
import CurrencyAnswer from "components/Answers/CurrencyAnswer";
import Tooltip from "components/Tooltip";
import TextAreaAnswer from "components/Answers/TextAreaAnswer";

export const AnswerDeleteButton = styled(DeleteButton)`
  position: absolute;
  right: 0.33em;
  top: 0.33em;
  width: 1em;
  height: 1em;
  line-height: 1;
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
      case NUMBER:
        return <NumberAnswer {...this.props} />;
      case CURRENCY:
        return <CurrencyAnswer {...this.props} />;
      case TEXTAREA:
        return <TextAreaAnswer {...this.props} />;
      case CHECKBOX:
        return <MultipleChoiceAnswer type={answer.type} {...this.props} />;
      case RADIO:
        return (
          <MultipleChoiceAnswer
            minOptions={2}
            type={answer.type}
            {...this.props}
          />
        );
      case DATE_RANGE:
        return <DateRange {...this.props} />;
      case DATE:
        return <Date {...this.props} />;
      default:
        throw new TypeError(`Unknown answer type: ${answer.type}`);
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
            data-test="btn-delete-answer"
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
