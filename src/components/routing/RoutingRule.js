import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TransitionGroup } from "react-transition-group";

import Transition from "components/routing/Transition";
import Button from "components/Button";

import RoutingRuleDestinationSelector from "./RoutingRuleDestinationSelector";

import RoutingCondition from "components/routing/RoutingCondition";
import ConditionSelect from "components/routing/ConditionSelect";
import { get } from "lodash";

import { RADIO } from "constants/answer-types";
import routingRuleFragment from "graphql/fragments/routing-rule.graphql";
import { colors } from "constants/theme";
import { Select as BaseSelect } from "components/Forms";
import { withLocalStorageState } from "./withLocalStorageState";

const Container = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.bordersLight};
  border-top: none;
  border-bottom: none;
`;

const Padding = styled.div`
  padding: 1em 0;
`;

const Title = styled.h2`
  margin: 0 -1px;
  padding: 2em 2.2em;
  letter-spacing: 0.05em;
  font-size: 0.9em;
  font-weight: bold;
  text-transform: uppercase;
  color: ${colors.darkGrey};
  text-align: center;
  background: ${colors.lighterGrey};
`;

const ConditionSelectorHeader = styled.div`
  background: #e4e8eb;
  border-top: 1px solid ${colors.secondary};
  /* border-bottom: 1px solid ${colors.bordersLight}; */
  padding: 0.5em 2em;
  font-weight: bold;
  color: ${colors.secondary};
  display: flex;
  align-items: center;
`;

const RemoveButton = styled(Button)`
  margin-left: auto;
  margin-right: -0.5em;
  padding: 0.2em 0.5em;
`;

const Label = styled.label`
  font-size: 1em;
`;

const UnwrappedRoutingRule = ({
  rule,
  onDeleteRule,
  onThenChange,
  onAddRoutingCondition,
  onToggleConditionOption,
  onUpdateRoutingCondition,
  onDeleteRoutingCondition,
  title,
  destinations,
  pagesAvailableForRouting,
  className,
  localState,
  setLocalState,
  ...otherProps
}) => {
  const { conditions, id, goto } = rule;
  const existingRadioConditions = {};

  const handleDeleteClick = () => onDeleteRule(rule);
  const handleAddClick = () => onAddRoutingCondition(rule);
  const handleThenChange = value => onThenChange({ id: id, goto: value });

  const handleSetConditionSelect = ({ name, value }) =>
    setLocalState({
      [name]: value
    });

  const matchOptions = {
    AND: "All of",
    OR: "Any of"
  };

  const conditionName = `${rule.id}-condition`;

  return (
    <Container
      className={className}
      data-test="routing-rule"
      id={`routing-rule-${rule.id}`}
    >
      {title && <Title>{title}</Title>}
      <ConditionSelectorHeader>
        <div>
          <Label htmlFor={conditionName}>Match</Label>
          <ConditionSelect
            id={conditionName}
            options={matchOptions}
            onChange={handleSetConditionSelect}
            value={localState[conditionName]}
            defaultValue={matchOptions.AND}
          />
          the following rules:
        </div>
        <RemoveButton small variant="tertiary" onClick={handleDeleteClick}>
          Remove rule
        </RemoveButton>
      </ConditionSelectorHeader>
      <div>
        <Padding>
          <TransitionGroup>
            {conditions.map((condition, index) => {
              const { answer } = condition;
              const canAddAndCondition = !existingRadioConditions[
                get(answer, "id")
              ];

              let conditionLabel = "IF";

              if (index > 0) {
                conditionLabel = get(localState, conditionName, "AND");
              }

              const component = (
                <Transition key={condition.id}>
                  <div>
                    <RoutingCondition
                      condition={condition}
                      label={conditionLabel}
                      ruleId={id}
                      sections={pagesAvailableForRouting}
                      onRemove={
                        conditions.length > 1 ? onDeleteRoutingCondition : null
                      }
                      onAdd={handleAddClick}
                      onPageChange={onUpdateRoutingCondition}
                      onToggleOption={onToggleConditionOption}
                      canAddAndCondition={canAddAndCondition}
                      {...otherProps}
                    />
                  </div>
                </Transition>
              );

              if (answer && answer.type === RADIO) {
                existingRadioConditions[answer.id] = true;
              }

              return component;
            })}
          </TransitionGroup>
        </Padding>
        <RoutingRuleDestinationSelector
          id="then"
          label="THEN"
          destinations={destinations}
          onChange={handleThenChange}
          value={goto}
          data-test="select-then"
        />
      </div>
    </Container>
  );
};

const RoutingRule = withLocalStorageState(UnwrappedRoutingRule);

RoutingRule.propTypes = {
  rule: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.node,
  onDeleteRule: PropTypes.func.isRequired,
  onAddRoutingCondition: PropTypes.func.isRequired,
  onToggleConditionOption: PropTypes.func.isRequired,
  onUpdateRoutingCondition: PropTypes.func.isRequired,
  onDeleteRoutingCondition: PropTypes.func,
  onThenChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  destinations: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  pagesAvailableForRouting: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  className: PropTypes.string
};

RoutingRule.fragments = {
  RoutingRule: routingRuleFragment
};

export default RoutingRule;
