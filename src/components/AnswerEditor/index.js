import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors, radius } from "constants/theme";

import CustomPropTypes from "custom-prop-types";
import DeleteButton from "components/DeleteButton";
import fp from "lodash/fp";

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
import BasicAnswer from "components/Answers/BasicAnswer";
import gql from "graphql-tag";

import IconCheckbox from "./icon-checkbox.svg?inline";
import IconRadio from "./icon-radio.svg?inline";
import IconCurrency from "./icon-currency.svg?inline";
import IconDate from "./icon-date.svg?inline";
import IconDateRange from "./icon-daterange.svg?inline";
import IconTextfield from "./icon-text.svg?inline";
import IconTextArea from "./icon-textarea.svg?inline";
import IconNumeric from "./icon-numeric.svg?inline";

const icons = {
  [CHECKBOX]: IconCheckbox,
  [RADIO]: IconRadio,
  [NUMBER]: IconNumeric,
  [CURRENCY]: IconCurrency,
  [DATE]: IconDate,
  [DATE_RANGE]: IconDateRange,
  [TEXTAREA]: IconTextArea,
  [TEXTFIELD]: IconTextfield
};

const Answer = styled.div`
  border: 1px solid ${colors.bordersLight};
  position: relative;
  border-radius: ${radius};

  &:focus-within {
    border-color: ${colors.blue};
    box-shadow: 0 0 0 1px ${colors.blue};
  }
`;

const AnswerType = styled.div`
  color: ${colors.darkGrey};
  background: ${colors.lightMediumGrey};
  border-bottom: 1px solid ${colors.bordersLight};
  text-align: center;
  padding: 0 1em;
  border-radius: ${radius} ${radius} 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4em;

  svg {
    width: 32px;
    height: 32px;
    position: absolute;
    left: -32px;
    top: 0;
    bottom: 0;
    margin: auto 0;
    opacity: 0.6;
  }
`;

const AnswerTypeText = styled.span`
  vertical-align: middle;
  font-size: 0.8em;
  font-weight: bold;
  position: relative;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Padding = styled.div`
  padding: 2em 6em 1.5em 1.5em;
`;

export const AnswerDeleteButton = styled(DeleteButton)`
  position: absolute;
  right: 0.2em;
  top: 1em;
`;

class AnswerEditor extends React.Component {
  handleDeleteAnswer = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onDeleteAnswer(this.props.answer.id);
  };

  formatIncludes = x =>
    fp.flow(
      fp.get("properties.format"),
      fp.includes(x)
    );

  renderAnswer(answer) {
    switch (answer.type) {
      case TEXTFIELD:
      case NUMBER:
      case TEXTAREA:
        return <BasicAnswer {...this.props} />;
      case CURRENCY:
        return <CurrencyAnswer {...this.props} />;
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
        return (
          <Date
            {...this.props}
            showDay={this.formatIncludes("dd")(answer)}
            showMonth={this.formatIncludes("mm")(answer)}
            showYear={this.formatIncludes("yyyy")(answer)}
          />
        );
      default:
        throw new TypeError(`Unknown answer type: ${answer.type}`);
    }
  }

  render() {
    const Icon = icons[this.props.answer.type];
    return (
      <Answer>
        <AnswerType>
          <AnswerTypeText>
            <Icon />
            {this.props.answer.type} ANSWER
          </AnswerTypeText>
        </AnswerType>
        <Padding>{this.renderAnswer(this.props.answer)}</Padding>
        <Tooltip
          content="Delete answer"
          place="top"
          offset={{ top: 0, bottom: 10 }}
        >
          <AnswerDeleteButton
            size="medium"
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
  onAddExclusive: PropTypes.func.isRequired,
  onAddOther: PropTypes.func.isRequired,
  onDeleteOther: PropTypes.func.isRequired,
  onUpdateOption: PropTypes.func.isRequired,
  onDeleteOption: PropTypes.func.isRequired
};

AnswerEditor.fragments = {
  AnswerEditor: gql`
    fragment AnswerEditor on Answer {
      ...Answer
      ...MultipleChoice
      ...DateRange
      ...Date
      ...BasicAnswer
    }
    ${BasicAnswer.fragments.Answer}
    ${BasicAnswer.fragments.BasicAnswer}
    ${MultipleChoiceAnswer.fragments.MultipleChoice}
    ${DateRange.fragments.DateRange}
    ${Date.fragments.Date}
  `
};

export default AnswerEditor;
