import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors, radius } from "constants/theme";

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

const Answer = styled.div`
  border: 1px solid ${colors.borders};
  position: relative;
  border-radius: ${radius};

  &:focus-within {
    border-color: ${colors.blue};
  }
`;

const AnswerType = styled.div`
  float: right;
  background: #e4e8eb;
  text-align: center;
  padding: 0.3em 1em;
  font-size: 0.8em;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 0 ${radius} 0 0;
`;

const Padding = styled.div`
  padding: 2em 3.5em 1.5em 1.5em;
`;

export const AnswerDeleteButton = styled(DeleteButton)`
  position: absolute;
  right: 0.33em;
  top: 0.8em;
  width: 1em;
  height: 1em;
  line-height: 1;
  padding: 0;
  overflow: hidden;
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
      <Answer>
        <AnswerType>{this.props.answer.type}</AnswerType>
        <Padding>{this.renderAnswer(this.props.answer)}</Padding>
        <Tooltip content="Delete answer">
          <AnswerDeleteButton
            small
            onClick={this.handleDeleteAnswer}
            aria-label="Delete answer"
            data-test="btn-delete-answer"
          />
        </Tooltip>
      </Answer>
    );
  }
}

AnswerEditor.propTypes = {
  answer: CustomPropTypes.answer,
  onUpdate: PropTypes.func.isRequired,
  onDeleteAnswer: PropTypes.func.isRequired,
  onAddOption: PropTypes.func.isRequired,
  onAddOther: PropTypes.func.isRequired,
  onDeleteOther: PropTypes.func.isRequired,
  onUpdateOption: PropTypes.func.isRequired,
  onDeleteOption: PropTypes.func.isRequired
};

export default AnswerEditor;
