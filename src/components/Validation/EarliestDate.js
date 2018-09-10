import { propType } from "graphql-anywhere";
import { flowRight } from "lodash/fp";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import EarliestDateValidationRule from "graphql/fragments/earliest-date-validation-rule.graphql";

import { Input, Number, Select } from "components/Forms";
import { Grid, Column } from "components/Grid";
import DisabledMessage from "components/Validation/DisabledMessage";

import withToggleAnswerValidation from "containers/enhancers/withToggleAnswerValidation";
import withUpdateAnswerValidation from "containers/enhancers/withUpdateAnswerValidation";
import withEntityEditor from "components/withEntityEditor";

import ValidationView from "./ValidationView";
import withAnswerValidation from "./withAnswerValidation";

import svgPath from "./path.svg";
import svgPathEnd from "./path-end.svg";

const UNITS = ["Days", "Months", "Years"];
const RELATIVE_POSITIONS = ["Before", "After"];

const DateInput = styled(Input)`
  margin-top: 4em;
  width: 12em;
`;
const ConnectedPath = styled.div`
  padding-left: 1em;
  position: relative;
  height: 100%;

  &::after {
    position: absolute;
    content: "";
    background: url(${({ pathUrl }) => pathUrl}) no-repeat center center;
    background-size: auto;
    width: 100%;
    height: calc(100% - 2em);
    top: 0;
    bottom: 0;
    margin: auto;
  }
`;

const ConnectedPathStart = styled(ConnectedPath)`
  height: 5em;
`;

const AlignedColumn = styled(Column)`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const RelativePositionSelect = styled(Select)`
  width: 6em;
`;

const EmphasisedText = styled.p`
  font-size: 0.9em;
  font-weight: bold;
  text-transform: uppercase;
`;

const START_COL_SIZE = 3;
const END_COL_SIZE = 12 - START_COL_SIZE;

export const EarliestDate = ({
  earliestDate,
  onToggleValidationRule,
  onUpdate,
  onChange
}) => {
  const { id, enabled, customDate, offset, relativePosition } = earliestDate;

  const handleToggleChange = ({ value: enabled }) => {
    onToggleValidationRule({
      id,
      enabled
    });
  };
  const renderContent = () => (
    <div>
      <Grid>
        <AlignedColumn cols={START_COL_SIZE}>
          <EmphasisedText>Earliest date is</EmphasisedText>
        </AlignedColumn>
        <Column cols={END_COL_SIZE}>
          <Grid>
            <Column cols={2}>
              <Number
                id="offset-value"
                name="offset.value"
                value={offset.value}
                onChange={onChange}
                onBlur={onUpdate}
                max={99999}
                min={0}
              />
            </Column>
            <Column cols={3}>
              <Select
                name="offset.unit"
                value={offset.unit}
                onChange={onChange}
                onBlur={onUpdate}
                data-test="offset-unit-select"
              >
                {UNITS.map(unit => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </Select>
            </Column>
          </Grid>
        </Column>
      </Grid>
      <Grid>
        <Column cols={START_COL_SIZE}>
          <ConnectedPathStart pathUrl={svgPath} />
        </Column>
      </Grid>
      <Grid>
        <AlignedColumn cols={START_COL_SIZE}>
          <RelativePositionSelect
            name="relativePosition"
            value={relativePosition}
            onChange={onChange}
            onBlur={onUpdate}
            data-test="relative-position-select"
          >
            {RELATIVE_POSITIONS.map(position => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </RelativePositionSelect>
        </AlignedColumn>
      </Grid>
      <Grid>
        <Column cols={START_COL_SIZE}>
          <ConnectedPath pathUrl={svgPathEnd} />
        </Column>
        <Column cols={END_COL_SIZE}>
          <DateInput
            name="customDate"
            type="date"
            value={customDate}
            onChange={onChange}
            onBlur={onUpdate}
          />
        </Column>
      </Grid>
    </div>
  );

  const renderDisabled = () => (
    <DisabledMessage>Earliest date is disabled</DisabledMessage>
  );

  return (
    <ValidationView
      data-test="earliest-date-validation"
      enabled={enabled}
      onToggleChange={handleToggleChange}
    >
      {enabled ? renderContent() : renderDisabled()}
    </ValidationView>
  );
};

EarliestDate.propTypes = {
  earliestDate: propType(EarliestDateValidationRule).isRequired,
  onToggleValidationRule: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export const readToWriteMapper = ({ id, customDate, enabled, ...rest }) => ({
  id,
  earliestDateInput: {
    ...rest,
    custom: customDate ? customDate : null
  }
});

export const remapToOnUpdate = (propName, mapper) => Component => props => (
  <Component
    onUpdate={(...args) => props[propName](mapper(...args))}
    {...props}
  />
);

const withEditing = flowRight(
  withAnswerValidation("earliestDate"),
  withUpdateAnswerValidation,
  withToggleAnswerValidation,
  remapToOnUpdate("onUpdateAnswerValidation", readToWriteMapper),
  withEntityEditor("earliestDate", EarliestDateValidationRule)
);
export default withEditing(EarliestDate);
