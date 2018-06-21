import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TransitionGroup } from "react-transition-group";

import Transition from "./Transition";
import Button from "components/Button";
import IconText from "components/IconText";
import RoutingRuleResultSelector from "./RoutingRuleResultSelector";
import RoutingRule from "./RoutingRule";

import IconAddRule from "./icon-add-rule.svg?inline";
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

const RoutingRuleSet = ({
  ruleSet,
  destinations,
  onAddRoutingRule,
  onElseChange,

  ...otherProps
}) => (
  <React.Fragment>
    <TransitionGroup>
      {ruleSet.routingRules.map((rule, index) => (
        <Transition key={rule.id}>
          <RoutingRule
            rule={rule}
            title={index > 0 ? rule.operation : null}
            key={rule.id}
            destinations={destinations}
            {...otherProps}
          />
        </Transition>
      ))}
    </TransitionGroup>
    <AddRuleButton
      variant="secondary"
      small
      onClick={() => onAddRoutingRule(ruleSet.id)}
      data-test="btn-add-rule"
    >
      <IconText icon={IconAddRule}>Add rule</IconText>
    </AddRuleButton>
    <Box>
      <RoutingRuleResultSelector
        id="else"
        label="ELSE"
        value={ruleSet.else}
        destinations={destinations}
        onChange={value => onElseChange({ id: ruleSet.id, else: value })}
        data-test="select-else"
      />
    </Box>
  </React.Fragment>
);

RoutingRuleSet.propTypes = {
  ruleSet: PropTypes.object.isRequired,
  destinations: PropTypes.object.isRequired,
  onAddRoutingRule: PropTypes.func.isRequired,
  onElseChange: PropTypes.func.isRequired
};

export default RoutingRuleSet;
