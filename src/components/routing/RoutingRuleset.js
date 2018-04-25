import React from "react";
import styled from "styled-components";

import Button from "components/Button";
import { BasicSection } from "components/EditorSurface/CanvasSection";
import IconAddRule from "./icon-add-rule.svg?inline";
import RoutingRuleResultSelector from "./RoutingRuleResultSelector";

import { colors } from "constants/theme";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import IconText from "components/IconText";

const AddRuleButton = styled(Button)`
  margin: 2em auto;
`;

const RoutingRuleCanvas = styled(BasicSection)`
  padding: 0;
  border-top: 1px solid ${colors.lighterGrey};
`;

const RoutingRuleset = ({
  children,
  onAddRule,
  onElseChange,
  sections,
  canRoute
}) => (
  <React.Fragment>
    {children}
    <AddRuleButton
      small
      naked
      onClick={onAddRule}
      data-test="btn-add-rule"
      disabled={!canRoute}
    >
      <IconText icon={IconAddRule}>Add rule</IconText>
    </AddRuleButton>
    <RoutingRuleCanvas>
      <RoutingRuleResultSelector
        id="else"
        label="ELSE"
        sections={sections}
        onChange={onElseChange}
        data-test="select-else"
        disabled={!canRoute}
      />
    </RoutingRuleCanvas>
  </React.Fragment>
);

RoutingRuleset.propTypes = {
  children: PropTypes.node.isRequired,
  onAddRule: PropTypes.func.isRequired,
  onElseChange: PropTypes.func.isRequired,
  sections: PropTypes.arrayOf(CustomPropTypes.section).isRequired,
  canRoute: PropTypes.bool.isRequired
};

RoutingRuleset.defaultProps = {
  canRoute: true
};

export default RoutingRuleset;
