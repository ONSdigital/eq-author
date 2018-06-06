import React from "react";
import styled from "styled-components";

import Button from "components/Button";

import IconAddRule from "./icon-add-rule.svg?inline";
import RoutingRuleResultSelector from "./RoutingRuleResultSelector";

import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import IconText from "components/IconText";
import { colors, radius } from "constants/theme";

const AddRuleButton = styled(Button)`
  width: 100%;
  margin-bottom: 2em;
  padding: 0.5em;
`;

const Box = styled.div`
  border: 1px solid ${colors.bordersLight};
  border-radius: ${radius};
  opacity: ${props => (props.disabled ? "0.5" : "1")};
`;

const RoutingRuleset = ({
  children,
  onAddRule,
  onElseChange,
  sections,
  elseValue,
  canRoute
}) => (
  <React.Fragment>
    {children}
    {canRoute && (
      <React.Fragment>
        <AddRuleButton
          variant="secondary"
          small
          onClick={onAddRule}
          data-test="btn-add-rule"
        >
          <IconText icon={IconAddRule}>Add rule</IconText>
        </AddRuleButton>
        <Box>
          <RoutingRuleResultSelector
            id="else"
            label="ELSE"
            value={elseValue}
            sections={sections}
            onChange={onElseChange}
            data-test="select-else"
          />
        </Box>
      </React.Fragment>
    )}
  </React.Fragment>
);

RoutingRuleset.propTypes = {
  children: PropTypes.node.isRequired,
  onAddRule: PropTypes.func.isRequired,
  onElseChange: PropTypes.func.isRequired,
  sections: PropTypes.arrayOf(CustomPropTypes.section).isRequired,
  elseValue: PropTypes.string,
  canRoute: PropTypes.bool.isRequired
};

RoutingRuleset.defaultProps = {
  canRoute: true
};

export default RoutingRuleset;
