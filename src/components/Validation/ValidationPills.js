import CustomPropTypes from "custom-prop-types";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { get } from "lodash";

import PillTabs from "components/PillTabs";
import ContentPickerSelect from "components/ContentPickerSelect";

import ValidationInput from "components/Validation/ValidationInput";

import * as entityTypes from "constants/validation-entity-types";
import * as answerTypes from "constants/answer-types";

const Pills = styled(PillTabs)`
  width: 5em;
`;

const PillTabContent = styled.div`
  margin-top: 3em;
  margin-bottom: 0;
  width: 100%;
`;

export const ValidationPills = ({
  entityType,
  answerType,
  previousAnswer,
  customValue,
  customValueLimit,
  onEntityTypeChange,
  onPreviousAnswerChange,
  onCustomValueChange
}) => (
  <Pills
    value={entityType}
    onChange={onEntityTypeChange}
    data-test="max-value-pill-tabs"
    options={[
      {
        id: "PreviousAnswer",
        title: "Previous answer",
        render: () => (
          <PillTabContent>
            <ContentPickerSelect
              onSubmit={onPreviousAnswerChange}
              answerTypes={[answerType]}
              selectedContentDisplayName={get(previousAnswer, "displayName")}
            />
          </PillTabContent>
        )
      },
      {
        id: "Custom",
        title: "Custom",
        render: () => (
          <PillTabContent>
            <ValidationInput
              data-test="max-value-input"
              list="defaultNumbers"
              value={customValue}
              type="number"
              id="max-value"
              onChange={onCustomValueChange}
              max={customValueLimit}
              min={0 - customValueLimit}
            />
          </PillTabContent>
        )
      }
    ]}
  />
);

ValidationPills.propTypes = {
  entityType: PropTypes.oneOf(Object.values(entityTypes)).isRequired,
  answerType: PropTypes.oneOf(Object.values(answerTypes)).isRequired,
  previousAnswer: PropTypes.shape({
    displayName: CustomPropTypes.string
  }),
  customValue: PropTypes.number,
  customValueLimit: PropTypes.number.isRequired,
  onEntityTypeChange: PropTypes.func.isRequired,
  onPreviousAnswerChange: PropTypes.func.isRequired,
  onCustomValueChange: PropTypes.func.isRequired
};
