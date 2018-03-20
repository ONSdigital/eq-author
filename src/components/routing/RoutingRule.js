import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { BasicSection } from "components/EditorSurface/CanvasSection";
import { Toolbar, Buttons } from "components/EditorSurface/Toolbar";
import IconButtonDelete from "components/IconButtonDelete";

import RoutingRuleEmpty from "./RoutingRuleEmptyMsg";

import getIdForObject from "utils/getIdForObject";
import { colors } from "constants/theme";
import CustomPropTypes from "custom-prop-types";
import RoutingRuleResultSelector from "./RoutingRuleResultSelector";

const RoutingRuleCanvas = styled(BasicSection)`
  padding: 0;
  border-top: 1px solid ${colors.lighterGrey};
`;

const Title = styled.h2`
  font-size: 0.9em;
  font-weight: 600;
  margin: 0;
`;

const RoutingStatement = styled.div`
  border-bottom: 1px solid ${colors.borders};
`;

const RoutingRule = ({
  children,
  page,
  onDeleteRule,
  onThenChange,
  onAddRule,
  title,
  sections,
  canRoute
}) => (
  <RoutingRuleCanvas id={getIdForObject(page)}>
    <Toolbar>
      <Title>{title}</Title>
      <Buttons>
        <IconButtonDelete
          onClick={onDeleteRule}
          data-test="btn-delete"
          disabled={!children}
        >
          Delete
        </IconButtonDelete>
      </Buttons>
    </Toolbar>

    {children ? (
      <React.Fragment>
        <RoutingStatement>{children}</RoutingStatement>
        <RoutingRuleResultSelector
          id="then"
          label="THEN"
          sections={sections}
          onChange={onThenChange}
          data-test="select-then"
          disabled={!canRoute}
        />
      </React.Fragment>
    ) : (
      <RoutingRuleEmpty
        title="No routing rules exist for this question"
        onAddRule={onAddRule}
      />
    )}
  </RoutingRuleCanvas>
);

RoutingRule.propTypes = {
  children: PropTypes.node,
  page: CustomPropTypes.page.isRequired,
  onAddRule: PropTypes.func.isRequired,
  onDeleteRule: PropTypes.func.isRequired,
  onThenChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(CustomPropTypes.section),
  canRoute: PropTypes.bool.isRequired
};

RoutingRule.defaultProps = {
  canRoute: true
};

export default RoutingRule;
