import React, { Component } from "react";

import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import { TransitionGroup } from "react-transition-group";
import styled from "styled-components";
import focusOnEntity from "utils/focusOnEntity";

import Option from "./Option";
import OptionTransition from "./OptionTransition";
import BasicAnswer from "components/Answers/BasicAnswer";

import { colors } from "constants/theme";
import { CHECKBOX } from "constants/answer-types";
import SplitButton from "components/SplitButton";
import Dropdown from "components/SplitButton/Dropdown";
import MenuItem from "components/SplitButton/MenuItem";

import { compose } from "redux";
import { connect } from "react-redux";
import { last, delay, xor, first } from "lodash";
import gql from "graphql-tag";
import { mapResultsToProps } from "containers/enhancers/withQuestionnaire";
import { fieldsInvalid, fieldValid } from "redux/fieldValidation/actions";
import { withRouter } from "react-router";

const AnswerWrapper = styled.div`
  margin: 2em 0 0;
  width: 75%;
`;

const AnswerHelper = styled.div`
  margin-bottom: 0.5em;
  font-size: 0.9em;
  font-weight: 600;
  color: ${colors.text};
`;

const ExclusiveOr = styled.div`
  padding-bottom: 1em;
  font-size: 1em;
  font-weight: bold;
  color: ${colors.text};
`;

const Options = styled.div`
  margin: 0 0 1em;
`;

export const AddOtherLink = styled.button`
  color: #48a6f6;
  text-decoration: none;
  border: 0;
  background: none;
`;

const SpecialOptionWrapper = styled.div`
  padding-top: 0.25em;
  margin-bottom: 2em;
`;

class MultipleChoiceAnswer extends Component {
  static propTypes = {
    answer: CustomPropTypes.answer.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onAddOption: PropTypes.func.isRequired,
    onUpdateOption: PropTypes.func.isRequired,
    onDeleteOption: PropTypes.func.isRequired,
    onAddOther: PropTypes.func.isRequired,
    onDeleteOther: PropTypes.func.isRequired,
    minOptions: PropTypes.number.isRequired,
    onAddExclusive: PropTypes.func.isRequired
  };

  static defaultProps = {
    minOptions: 1
  };

  state = {
    open: false
  };

  componentDidUpdate(prevProps) {
    const newBasicOption = xor(
      this.props.answer.options,
      prevProps.answer.options
    );

    if (!prevProps.answer.other && this.props.answer.other) {
      console.log("has new other option");

      this.newOptions = [
        this.props.answer.other.answer,
        this.props.answer.other.option
      ];
    } else if (newBasicOption) {
      console.log("has new normal option");

      this.newOptions = xor(
        this.props.answer.options,
        prevProps.answer.options
      );
    }

    console.log(this.newOptions);
  }

  handleOptionDelete = optionId => {
    this.props.fieldValid(
      this.props.match.params.pageId,
      `option-label-${optionId}`
    );
    this.props.onDeleteOption(optionId, this.props.answer.id);
  };

  handleAddOption = e => {
    e.preventDefault();
    e.stopPropagation();
    return this.props.onAddOption(this.props.answer.id).then(focusOnEntity);
  };

  handleAddExclusive = e => {
    e.preventDefault();
    e.stopPropagation();
    return this.props
      .onAddExclusive(this.props.answer.id)
      .then(this.handleToggleOpen(false))
      .then(focusOnEntity);
  };

  handleAddOther = e => {
    e.preventDefault();
    return this.props
      .onAddOther(this.props.answer)
      .then(res => {
        this.handleToggleOpen(false);
        return res;
      })
      .then(res => res.option)
      .then(focusOnEntity);
  };

  handleDeleteOther = () => {
    return this.props
      .onDeleteOther(this.props.answer)
      .then(() => last(this.props.answer.options))
      .then(focusOnEntity);
  };

  handleToggleOpen = open => {
    this.setState({
      open
    });
  };

  handleBlur = e => {
    const { answer } = this.props;

    delay(() => {
      let allFields = answer.options;

      if (answer.other) {
        allFields = allFields
          .concat(answer.other.option)
          .concat(answer.other.answer);
      }

      if (this.newOptions) {
        console.log(this.newOptions);

        allFields = allFields.filter(o => {
          console.log(o);
        });
      }

      const invalidFieldsIds = allFields.filter(o => !o.label).map(o => {
        const typename = (o.__typename === "Option"
          ? "option"
          : "answer"
        ).toLowerCase();
        return `${typename}-label-${o.id}`;
      });

      if (invalidFieldsIds.length > 0) {
        this.props.fieldsInvalid(
          this.props.match.params.pageId,
          invalidFieldsIds
        );
      }

      // this.newOptions = null;
    }, 200);
  };

  render() {
    const {
      answer,
      onUpdateOption,
      onUpdate,
      minOptions,
      ...otherProps
    } = this.props;

    const numberOfOptions = answer.options.length + (answer.other ? 1 : 0);
    const showDeleteOption = numberOfOptions > minOptions;

    return (
      <BasicAnswer
        answer={answer}
        onUpdate={onUpdate}
        autoFocus={false}
        labelText="Label (optional)"
        labelRequired={false}
      >
        <AnswerWrapper onBlur={this.handleBlur}>
          {answer.type === CHECKBOX && (
            <AnswerHelper>Select all that apply</AnswerHelper>
          )}
          <TransitionGroup
            component={Options}
            data-test="multiple-choice-options"
          >
            {answer.options.map(option => (
              <OptionTransition key={option.id}>
                <Option
                  {...otherProps}
                  option={option}
                  onDelete={this.handleOptionDelete}
                  onUpdate={onUpdateOption}
                  onEnterKey={this.handleAddOption}
                  hasDeleteButton={showDeleteOption}
                />
              </OptionTransition>
            ))}
            {answer.other && (
              <OptionTransition key={answer.other.option.id}>
                <Option
                  {...otherProps}
                  option={answer.other.option}
                  onDelete={this.handleDeleteOther}
                  onUpdate={onUpdateOption}
                  onEnterKey={this.handleAddOption}
                  hasDeleteButton={showDeleteOption}
                  labelPlaceholder="eg. Other"
                >
                  <SpecialOptionWrapper data-test="other-answer">
                    <BasicAnswer
                      answer={answer.other.answer}
                      onUpdate={onUpdate}
                      showDescription={false}
                      labelText="Other label"
                      labelPlaceholder="eg. Please specify"
                      bold={false}
                    />
                  </SpecialOptionWrapper>
                </Option>
              </OptionTransition>
            )}
            {answer.mutuallyExclusiveOption && (
              <OptionTransition key={answer.mutuallyExclusiveOption.id}>
                <SpecialOptionWrapper data-test="exclusive-option">
                  <ExclusiveOr>Or</ExclusiveOr>
                  <Option
                    {...otherProps}
                    option={answer.mutuallyExclusiveOption}
                    onDelete={this.handleOptionDelete}
                    onUpdate={onUpdateOption}
                    onEnterKey={this.handleAddOption}
                    hasDeleteButton
                  />
                </SpecialOptionWrapper>
              </OptionTransition>
            )}
          </TransitionGroup>
          <div>
            <SplitButton
              onPrimaryAction={this.handleAddOption}
              primaryText={
                answer.type === CHECKBOX ? "Add checkbox" : "Add another option"
              }
              onToggleOpen={this.handleToggleOpen}
              open={this.state.open}
              dataTest="btn-add-option"
            >
              <Dropdown>
                <MenuItem
                  onClick={this.handleAddOther}
                  disabled={answer.other !== null}
                  data-test="btn-add-option-other"
                >
                  Add &ldquo;Other&rdquo; option
                </MenuItem>
                {answer.type === CHECKBOX && (
                  <MenuItem
                    onClick={this.handleAddExclusive}
                    disabled={answer.mutuallyExclusiveOption !== null}
                    data-test="btn-add-mutually-exclusive-option"
                  >
                    Add an &ldquo;Or&rdquo; option
                  </MenuItem>
                )}
              </Dropdown>
            </SplitButton>
          </div>
        </AnswerWrapper>
      </BasicAnswer>
    );
  }
}

MultipleChoiceAnswer.fragments = {
  MultipleChoice: gql`
    fragment MultipleChoice on Answer {
      ...Answer
      ... on MultipleChoiceAnswer {
        options {
          ...Option
        }
        other {
          option {
            ...Option
          }
          answer {
            ...Answer
          }
        }
        mutuallyExclusiveOption {
          ...Option
        }
      }
    }
    ${Option.fragments.Option}
    ${BasicAnswer.fragments.Answer}
  `
};

const mapDispatchToProps = dispatch => ({
  fieldsInvalid: (...params) => dispatch(fieldsInvalid(...params)),
  fieldValid: (...params) => dispatch(fieldValid(...params))
});

export default compose(
  withRouter,
  connect(
    null,
    mapDispatchToProps
  )
)(MultipleChoiceAnswer);
