import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { Input, Number, Select } from "components/Forms";
import { Grid, Column } from "components/Grid";
import DisabledMessage from "components/Validation/DisabledMessage";

import ValidationView from "../ValidationView";
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
  margin: 0;
  text-transform: uppercase;
`;

const START_COL_SIZE = 3;
const END_COL_SIZE = 12 - START_COL_SIZE;

const getUnits = format => {
  if (format === "dd/mm/yyyy") {
    return UNITS;
  }

  if (format === "mm/yyyy") {
    return UNITS.slice(1);
  }

  return UNITS.slice(2);
};

const DateValidation = ({
  answer,
  date,
  displayName,
  testId,
  onToggleValidationRule,
  onUpdate,
  onChange
}) => {
  const { id, enabled, customDate, offset, relativePosition } = date;
  const {
    properties: { format }
  } = answer;

  const handleToggleChange = ({ value: enabled }) => {
    onToggleValidationRule({
      id,
      enabled
    });
  };

  const availableUnits = getUnits(format);
  const offsetUnitIsInvalid = !availableUnits.includes(offset.unit);

  const renderContent = () => (
    <div>
      <Grid>
        <AlignedColumn cols={START_COL_SIZE}>
          <EmphasisedText>{displayName} is</EmphasisedText>
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
            <Column cols={4}>
              <Select
                name="offset.unit"
                value={!offsetUnitIsInvalid ? offset.unit : ""}
                onChange={onChange}
                onBlur={onUpdate}
                data-test="offset-unit-select"
              >
                {offsetUnitIsInvalid && (
                  <option key="Please select" value="" disabled>
                    Please select…
                  </option>
                )}
                {availableUnits.map(unit => (
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
            max="9999-12-30"
            min="1000-01-01"
          />
        </Column>
      </Grid>
    </div>
  );

  const renderDisabled = () => (
    <DisabledMessage>{displayName} is disabled</DisabledMessage>
  );

  return (
    <ValidationView
      data-test={testId}
      enabled={enabled}
      onToggleChange={handleToggleChange}
    >
      {enabled ? renderContent() : renderDisabled()}
    </ValidationView>
  );
};

DateValidation.propTypes = {
  date: PropTypes.shape({
    id: PropTypes.string.isRequired,
    enabled: PropTypes.bool.isRequired,
    customDate: PropTypes.string,
    offset: PropTypes.shape({
      unit: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    }).isRequired,
    relativePosition: PropTypes.string.isRequired
  }).isRequired,
  answer: PropTypes.shape({
    properties: PropTypes.shape({
      format: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  onToggleValidationRule: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  displayName: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired
};

export default DateValidation;
