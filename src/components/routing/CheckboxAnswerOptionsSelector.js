/* eslint-disable react/jsx-no-bind */

/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-handler-names */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable dot-notation */
/* eslint-disable no-unused-vars */

import React from "react";
import styled from "styled-components";

import { get, find, includes, map, pull } from "lodash";

import { withLocalStorageState } from "./withLocalStorageState";

import { TransitionGroup } from "react-transition-group";

import Transition from "components/routing/Transition";

import { PropTypes } from "prop-types";
import TextButton from "../TextButton";
import CheckboxOptionPicker from "./CheckboxOptionPicker";
import Chip from "./Chip";
import { Select as BaseSelect, Label } from "components/Forms";
import { colors } from "constants/theme";
import ConditionSelect from "./ConditionSelect";

const Select = styled(BaseSelect)`
  display: inline-block;
  width: auto;
  margin: 0 0.5em;
  padding: 0.3em 2em 0.3em 0.5em;
`;

const Selector = styled.div`
  margin: 1em 0;
  padding: 0 1em 0 0;
  display: flex;
  align-items: baseline;
`;

const PositioningContext = styled.div`
  position: relative;
`;

const MatchLabel = styled(Label)`
  margin: 0.25rem 0;
`;

const ChooseButton = styled(TextButton)`
  margin: 0.25rem;
  line-height: 1.2;
`;

const SelectedOptions = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

class CheckboxAnswerOptionsSelector extends React.Component {
  state = {
    showPopup: false
  };

  handleSetConditionSelect = ({ name, value }) =>
    this.props.setLocalState({
      [name]: value
    });

  handleOptionDelete = id => {
    const { localState, condition } = this.props;

    this.props.setLocalState({
      selectedOptions: {
        [this.props.condition.id]: pull(
          localState.selectedOptions[condition.id],
          id
        )
      }
    });
  };

  handlePickerClose = selectedOptions => {
    const existingOptions = get(this.props.localState, "selectedOptions");

    this.props.setLocalState({
      selectedOptions: {
        ...existingOptions,
        [this.props.condition.id]: selectedOptions
      }
    });

    this.setState({ showPopup: false });
  };

  renderChipContent = (options, id) => {
    const { condition, setLocalState, localState } = this.props;
    const answerOtherOption = get(condition, "answer.other.option");
    const mutuallyExclusiveOption = get(
      condition,
      "answer.mutuallyExclusiveOption"
    );

    if (answerOtherOption && id === answerOtherOption.id) {
      return answerOtherOption.label;
    } else if (mutuallyExclusiveOption && id === mutuallyExclusiveOption.id) {
      return mutuallyExclusiveOption.label;
    }

    return find(options, { id }).label;
  };

  render() {
    const { condition, setLocalState, localState } = this.props;

    let selectedOptions = get(
      localState,
      `selectedOptions[${condition.id}]`,
      []
    );

    const answerOptions = get(condition, "answer.options", []);
    const answerOtherOption = get(condition, "answer.other.option");
    const options = answerOtherOption
      ? answerOptions.concat(answerOtherOption)
      : answerOptions;

    const conditionName = `${condition.id}-condition`;

    return (
      <Selector>
        <MatchLabel>
          <span>Match</span>
          <ConditionSelect
            id={conditionName}
            onChange={this.handleSetConditionSelect}
            value={localState[conditionName]}
          />
        </MatchLabel>
        <TransitionGroup component={SelectedOptions}>
          {selectedOptions &&
            selectedOptions.map(id => (
              <Transition key={id}>
                <Chip onRemove={this.handleOptionDelete} id={id}>
                  {this.renderChipContent(options, id)}
                </Chip>
              </Transition>
            ))}
          <Transition key="button">
            <PositioningContext>
              <ChooseButton
                onClick={() =>
                  this.setState({
                    showPopup: true
                  })
                }
              >
                CHOOSE
              </ChooseButton>
              {this.state.showPopup && (
                <CheckboxOptionPicker
                  answer={condition.answer}
                  selectedOptions={selectedOptions}
                  options={options}
                  onClose={this.handlePickerClose}
                />
              )}
            </PositioningContext>
          </Transition>
        </TransitionGroup>
      </Selector>
    );
  }
}

CheckboxAnswerOptionsSelector.propTypes = {
  condition: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onOptionSelectionChange: PropTypes.func.isRequired
};

export default withLocalStorageState(CheckboxAnswerOptionsSelector, {
  storageKey: "CHECKBOX_ANSWERS"
});
