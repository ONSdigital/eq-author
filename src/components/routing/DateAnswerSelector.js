/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-handler-names */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable dot-notation */

import React from "react";
import styled from "styled-components";

import { PropTypes } from "prop-types";
import { radius, colors } from "constants/theme";

import { withLocalStorageState } from "./withLocalStorageState";
import { withRouter } from "react-router";

import { Input, Select } from "components/Forms";

import { flow, first, negate, overSome, isEmpty, get } from "lodash";
import { DATE } from "constants/answer-types";

const DateAnswer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  margin: 1em 6em 0 0;
`;

const Flex = styled.div`
  display: flex;
  width: 25em;
  align-items: center;
  margin-bottom: 1em;
  > * :not(:last-child) {
    margin-right: 1em;
  }
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 0.5em;
`;

const NumericInput = styled(Input)`
  border-radius: ${radius};
  &:hover {
    outline: none;
  }
`;

const Fields = styled.div`
  padding: 1em;
  background-color: #efefef;
  border-radius: 4px;
`;

const DateUnitSelect = ({ ...otherProps }) => (
  <Select {...otherProps}>
    <option value="years">Year/s</option>
    <option value="months">Month/s</option>
    <option value="weeks">Week/s</option>
    <option value="days">Day/s</option>
  </Select>
);

const InfoBox = styled.div`
  border-radius: ${radius};
  padding: 0.5em 1em;
  border: 1px solid ${colors.lightGrey};
  background: ${colors.lighterGrey};
  width: 100%;
`;

const DateOperatorSelect = props => (
  <Select {...props}>
    <option value="greater-than">{"At least"}</option>
    <option value="less-than">{"At most"}</option>
    <option value="equal-to">{"Exactly"}</option>
  </Select>
);

const DateComparisonFields = ({ condition, onChange, localState }) => {
  const numericSelectId = `condition-${condition.id}-numeric-select`;
  const comparisonValueId = `condition-${condition.id}-comparison-value`;
  const dateUnitId = `condition-${condition.id}-date-unit`;

  const isMultiple = parseInt(localState[comparisonValueId], 10) > 1;

  return (
    <Flex>
      <DateOperatorSelect
        onChange={onChange}
        name={numericSelectId}
        id={numericSelectId}
        defaultValue={localState[numericSelectId]}
      />
      <NumericInput
        onChange={onChange}
        name={comparisonValueId}
        id={comparisonValueId}
        value={localState[comparisonValueId]}
        placeholder="0"
      />
      <DateUnitSelect
        onChange={onChange}
        name={dateUnitId}
        id={dateUnitId}
        defaultValue={localState[dateUnitId]}
        isMultiple={isMultiple}
      />
      <Label style={{ marginBottom: "0" }}>Ago</Label>
    </Flex>
  );
};

const CompletionDate = () => (
  <InfoBox>
    The date the respondent fills in the the survey. E.g. 16 years ago.
  </InfoBox>
);

const DateAnswerSelector = ({
  condition,
  sections,
  localState,
  setLocalState
}) => {
  const isAnswerValidForRouting = answer => get(answer, "type") === DATE;

  const firstAnswerIsValid = flow(
    first,
    isAnswerValidForRouting
  );
  const shouldDisable = overSome([isEmpty, negate(firstAnswerIsValid)]);

  const convertToGroups = (sections, condition) =>
    sections.map(section => ({
      label: section.plaintextTitle || "Section Title",
      id: section.id,
      options: section.pages.map(page => ({
        label: page.plaintextTitle || "Page Title",
        value: page.id,
        disabled:
          shouldDisable(page.answers) || page.id === condition.questionPage.id
      }))
    }));

  const handleChange = ({ name, value }) => setLocalState({ [name]: value });

  const props = {
    condition: condition,
    sections: convertToGroups(sections, condition),
    localState,
    onChange: handleChange,
    answerType: DATE
  };

  return (
    <DateAnswer data-test="options-selector">
      <Fields>
        <DateComparisonFields
          condition={condition}
          localState={localState}
          onChange={handleChange}
        />
        <CompletionDate {...props} />
      </Fields>
    </DateAnswer>
  );
};

DateAnswerSelector.propTypes = {
  condition: PropTypes.object.isRequired,
  sections: PropTypes.array.isRequired,
  localState: PropTypes.object.isRequired,
  setLocalState: PropTypes.func.isRequired
};

export default flow(
  withRouter,
  withLocalStorageState
)(DateAnswerSelector);
