import React from "react";
import { colors } from "constants/theme";
import Select from "./Select";
import styled from "styled-components";

import getTextFromHTML from "utils/getTextFromHTML";

import { flatMapDeep, indexOf, find } from "lodash";

import iconRemove from "./icon-close.svg";

import MultipleChoiceAnswerSelector from "./MultipleChoiceAnswerSelector";
import DateSelector from "./DateSelector";
import DateRangeSelector from "./DateRangeSelector";
import NumericSelector from "./NumericSelector";
import ComparatorSelect from "./ComparatorSelect";
import DateComparisonSelector from "./DateComparisonSelector";
import TextBtn from "./TextBtn";
import AddBtn from "./AddBtn";

import { Alert as Alert2, AlertBody, AlertIcon } from "./Alert";

import {
  ON,
  AFTER,
  BEFORE,
  BETWEEN,
  YEARS_FROM,
  MONTHS_FROM,
  DAYS_FROM,
  IF,
  AND,
  EQ,
  NOT_EQ
} from "./constants";

const Alert = styled(Alert2)`
  padding: 1em 2em 1em 3em;
`;

const Field = styled.div`
  display: flex;
  align-items: center;
  padding: 0;
`;

const Label = styled.label`
  font-size: 0.9em;
  font-weight: 600;
  width: 3em;
`;

const Comparator = styled.div`
  padding: 0.5em 3em;
  display: flex;
`;

const Operator = styled.div`
  font-weight: 600;
`;

const Row = styled.div`
  background-repeat: no-repeat;
  background-position: 1em 0;
  min-height: 3.5em;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    display: block;
    width: 1.4em;
    height: 1px;
    top: 1.6em;
    left: 1em;
    border-top: 1px ${colors.borders} solid;
  }
  &::after {
    content: "";
    position: absolute;
    display: block;
    width: 1em;
    height: ${props => (props.lastChild ? "1.6em" : "100%")};
    top: 0;
    bottom: 0;
    left: 1em;
    border-left: 1px ${colors.borders} solid;
  }
`;

const AddAnd = styled.div`
  padding: 0.5em 0;
  margin: 0.4em 0 0.4em -0.3em;
  &[disabled] {
    opacity: 0.5;
  }
`;

const RemoveBtn = styled.button.attrs({
  type: "button"
})`
  background: url(${iconRemove}) no-repeat center;
  width: 1.5em;
  height: 2em;
  border: none;
  padding: 0;
  background-size: 100%;
  margin-left: 1.5em;
  opacity: 0.85;
  &:hover,
  &:focus {
    outline: none;
    opacity: 1;
  }
  &[disabled] {
    opacity: 0.2;
    pointer-events: none;
  }
`;

const ComparatorOpts = ({
  comparator,
  options,
  selectConditionComparator,
  conditionId,
  id
}) => (
  <ComparatorSelect
    defaultValue={comparator || options[0]}
    onChange={function(e) {
      selectConditionComparator(id, e.target.value);
    }}
  >
    {options.map((opt, index) => (
      <option value={opt} key={index} disabled={opt === "——————"}>
        {opt}
      </option>
    ))}
  </ComparatorSelect>
);

const MultipleChoiceStatement = ({
  answer,
  comparator,
  selectConditionComparator,
  id,
  ...otherProps
}) => (
  <Comparator>
    <ComparatorOpts
      comparator={comparator}
      selectConditionComparator={selectConditionComparator}
      id={id}
      options={[EQ, NOT_EQ]}
    />
    <MultipleChoiceAnswerSelector
      options={answer.options}
      answer={answer}
      conditionId={id}
      {...otherProps}
    />
  </Comparator>
);

const DateStatement = ({
  answer,
  comparator,
  selectConditionComparator,
  id,
  ...otherProps
}) => (
  <Comparator>
    <ComparatorOpts
      comparator={comparator}
      selectConditionComparator={selectConditionComparator}
      id={id}
      options={[
        ON,
        AFTER,
        BEFORE,
        "——————",
        BETWEEN,
        "——————",
        YEARS_FROM,
        MONTHS_FROM,
        DAYS_FROM
      ]}
    />
    <ComparatorType comparator={comparator} answer={answer} {...otherProps} />
  </Comparator>
);

const NumberStatement = ({
  answer,
  comparator,
  selectConditionComparator,
  id,
  ...otherProps
}) => (
  <Comparator>
    <ComparatorType comparator={comparator} answer={answer} {...otherProps} />
  </Comparator>
);

const ComparatorType = ({ comparator, answer, ...otherProps }) => {
  if (answer.type === "Number") {
    return (
      <NumericSelector
        options={answer.options}
        comparator={comparator}
        {...otherProps}
      />
    );
  }

  switch (comparator) {
    case BETWEEN:
      return (
        <DateRangeSelector
          options={answer.options}
          comparator={comparator}
          {...otherProps}
        />
      );
    case YEARS_FROM:
    case MONTHS_FROM:
    case DAYS_FROM:
      return (
        <DateComparisonSelector
          options={answer.options}
          comparator={comparator}
          {...otherProps}
        />
      );

    default:
      return (
        <DateSelector
          options={answer.options}
          comparator={comparator}
          multiselect
          {...otherProps}
        />
      );
  }
};

const mapSectionsToOptions = (sections, disabled) =>
  sections.map(
    ({ title: sectionTitle, pages, id: sectionId }, sectionIndex) => ({
      label: getTextFromHTML(sectionTitle),
      options: flatMapDeep(
        pages.map((question, questionIndex) => {
          return question.answers.length
            ? question.answers.map((answer, answerIndex) => {
                let title = "";
                if (question.answers.length === 1) {
                  title = `${sectionIndex + 1}.${questionIndex +
                    1}. ${getTextFromHTML(question.title)}`;
                } else {
                  title = `${sectionIndex + 1}.${questionIndex +
                    1}.${answerIndex + 1} ${getTextFromHTML(
                    question.title
                  )} [answer ${answerIndex + 1}]`;
                }
                return {
                  title,
                  id: `${question.id}-${answer.id}`,
                  value: `${question.id}-${answer.id}`,
                  disabled: disabled(question)
                };
              })
            : {
                title: `${sectionIndex + 1}.${questionIndex +
                  1}. ${getTextFromHTML(question.title)}`,
                id: question.id,
                value: question.id,
                disabled: true
              };
        })
      )
    })
  );

class RoutingCondition extends React.Component {
  getAnswer = canAddAnother => {
    const { answer, ...otherProps } = this.props;

    if (!answer) {
      return (
        <Alert>
          <AlertIcon />
          <AlertBody>
            No answers have been added to this question yet. &nbsp;
          </AlertBody>
          <AddBtn>Add an answer</AddBtn>
        </Alert>
      );
    }

    switch (answer.type) {
      case "Checkbox":
      case "Radio":
        return <MultipleChoiceStatement answer={answer} {...otherProps} />;
      case "Date":
        return <DateStatement answer={answer} {...otherProps} />;
      case "Number":
        return <NumberStatement answer={answer} {...otherProps} />;

      default: {
        return (
          <Alert>
            <AlertIcon />
            <AlertBody>
              Routing is not available for this type of answer.
            </AlertBody>
          </Alert>
        );
      }
    }
  };

  handleQuestionSelect = ({ name, value, event }) => {
    const { onQuestionSelect, conditionId } = this.props;

    this.props.onQuestionSelect(conditionId, value);
  };

  render() {
    const {
      questionnaire,
      question,
      id,
      onRemoveBtnClick,
      firstChild,
      onlyChild,
      lastChild,
      selectedQuestionId,
      onAddBtnClick,
      onOrBtnClick,
      answer,
      type
    } = this.props;

    const allQuestions = flatMapDeep(
      questionnaire.sections,
      section => section.pages
    );

    const canAddAnother = lastChild && answer;
    const currentQuestionIndex = indexOf(allQuestions, question);

    const Add = <TextBtn onClick={onAddBtnClick}>AND</TextBtn>;
    const Or = <TextBtn onClick={onOrBtnClick}>OR</TextBtn>;
    const OrWide = (
      <TextBtn onClick={onOrBtnClick} style={{ width: "3.2em" }}>
        OR
      </TextBtn>
    );

    const opts = mapSectionsToOptions(
      questionnaire.sections,
      question => currentQuestionIndex < indexOf(allQuestions, question)
    );

    const questionAnswerId = answer
      ? `${selectedQuestionId}-${answer.id}`
      : selectedQuestionId;

    return (
      <div style={{ padding: "0.2em 0" }}>
        <Field>
          <Label
            htmlFor="question"
            style={{ width: "3em", textAlign: "center" }}
          >
            <Operator>{firstChild ? IF : type}</Operator>
          </Label>
          <Select
            id="question"
            optionGroup={opts}
            onChange={this.handleQuestionSelect}
            defaultValue={questionAnswerId}
            style={{ marginLeft: "1em" }}
          />
          <RemoveBtn
            disabled={firstChild && !onlyChild}
            onClick={function() {
              onRemoveBtnClick(id);
            }}
          />
        </Field>
        <Row lastChild={lastChild}>{this.getAnswer()}</Row>
        {canAddAnother && (
          <AddAnd>
            {type === IF ? (
              <div>
                {Add} <span style={{ color: colors.borders }}>|</span> {Or}
              </div>
            ) : (
              <div>{type === AND ? Add : OrWide}</div>
            )}
          </AddAnd>
        )}
      </div>
    );
  }
}

export default RoutingCondition;
