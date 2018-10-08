/* eslint-disable react/jsx-no-bind */

/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-handler-names */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable dot-notation */

import React from "react";
import styled from "styled-components";

import { get } from "lodash";

import { withLocalStorageState } from "./withLocalStorageState";

import { PropTypes } from "prop-types";
import TextButton from "../TextButton";
import CheckboxOptionPicker from "./CheckboxOptionPicker";
import { Select as BaseSelect, Label } from "components/Forms";

const Select = styled(BaseSelect)`
  display: inline-block;
  width: auto;
  margin: 0 0.5em;
  padding: 0.3em 2em 0.3em 0.5em;
`;

const Selector = styled.div`
  margin: 1em 0;
  display: flex;
  align-items: center;
`;

const CheckboxAnswerOptionsSelector = ({
  condition,
  onOptionSelectionChange,
  setState,
  state
}) => {
  // const answerOptions = get(condition, "answer.options", []);
  // const answerOtherOption = get(condition, "answer.other.option");
  // const options = answerOtherOption
  //   ? answerOptions.concat(answerOtherOption)
  //   : answerOptions;

  // const selectedOptions = get(condition, "routingValue.value", []);

  return (
    <Selector>
      <Label>Match</Label>
      <Select>
        <option value="">All of</option>
      </Select>
      <TextButton
        onClick={() =>
          setState({
            showPopup: true
          })
        }
      >
        CHOOSE
      </TextButton>

      {state.showPopup && (
        <CheckboxOptionPicker
          answer={condition.answer}
          onClose={() => setState({ showPopup: false })}
        />
      )}
    </Selector>
  );
};

CheckboxAnswerOptionsSelector.propTypes = {
  condition: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onOptionSelectionChange: PropTypes.func.isRequired
};

export default withLocalStorageState(CheckboxAnswerOptionsSelector);
