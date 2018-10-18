import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import PillTabs from "components/PillTabs";

import * as entityTypes from "constants/validation-entity-types";

export const Pills = styled(PillTabs)`
  width: 5em;
`;

const PillTabContent = styled.div`
  margin-top: 3em;
  margin-bottom: 0;
  width: 100%;
`;

export const ValidationPills = ({
  entityType,
  onEntityTypeChange,
  PreviousAnswer,
  Custom
}) => (
  <Pills
    value={entityType}
    onChange={onEntityTypeChange}
    options={[
      {
        id: "PreviousAnswer",
        title: "Previous answer",
        render: () => (
          <PillTabContent>
            <PreviousAnswer />
          </PillTabContent>
        )
      },
      {
        id: "Custom",
        title: "Custom",
        render: () => (
          <PillTabContent>
            <Custom />
          </PillTabContent>
        )
      }
    ]}
  />
);

ValidationPills.propTypes = {
  entityType: PropTypes.oneOf(Object.values(entityTypes)).isRequired,
  onEntityTypeChange: PropTypes.func.isRequired,
  PreviousAnswer: PropTypes.func,
  Custom: PropTypes.func
};
