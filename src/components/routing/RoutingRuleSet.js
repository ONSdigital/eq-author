import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TransitionGroup } from "react-transition-group";

import routingRuleSetFragment from "graphql/fragments/routing-rule-set.graphql";

import Transition from "./Transition";
import Button from "components/Button";

import RoutingRuleDestinationSelector from "./RoutingRuleDestinationSelector";
import RoutingRule from "./RoutingRule";
import { colors } from "constants/theme";

const AddRule = styled.div`
  padding: 1em 0;
  display: flex;
`;

const AddRuleButton = styled(Button)`
  margin: 0 auto;
  padding: 0.5em 2em;
`;

const RoutingRuleResult = styled.div`
  border-left: 1px solid ${colors.lightGrey};
  border-right: 1px solid ${colors.lightGrey};
`;

const RoutingRuleSet = ({
  ruleSet,
  destinations,
  onAddRoutingRule,
  onElseChange,
  ...otherProps
}) => {
  const handleAddClick = () => onAddRoutingRule(ruleSet.id);
  const handleElseChange = value =>
    onElseChange({ id: ruleSet.id, else: value });

  return (
    <React.Fragment>
      <TransitionGroup>
        {ruleSet.routingRules.map((rule, index) => (
          <Transition key={rule.id}>
            <RoutingRule
              rule={rule}
              title={index > 0 ? "Else" : null}
              key={rule.id}
              destinations={destinations}
              {...otherProps}
            />
          </Transition>
        ))}
      </TransitionGroup>

      <AddRule>
        <AddRuleButton
          variant="secondary"
          onClick={handleAddClick}
          data-test="btn-add-rule"
        >
          Add ELSE rule
        </AddRuleButton>
      </AddRule>
      <RoutingRuleResult>
        <RoutingRuleDestinationSelector
          id="else"
          label="ELSE"
          value={ruleSet.else}
          destinations={destinations}
          onChange={handleElseChange}
          data-test="select-else"
        />
      </RoutingRuleResult>
    </React.Fragment>
  );
};

RoutingRuleSet.fragments = {
  RoutingRuleSet: routingRuleSetFragment
};

RoutingRuleSet.propTypes = {
  ruleSet: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  destinations: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onAddRoutingRule: PropTypes.func.isRequired,
  onElseChange: PropTypes.func.isRequired
};

export default RoutingRuleSet;
