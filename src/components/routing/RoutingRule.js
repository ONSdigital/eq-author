import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TransitionGroup } from "react-transition-group";

import Transition from "components/routing/Transition";
import Button from "components/Button";
import IconText from "components/IconText";
import { colors, radius } from "constants/theme";
import IconRoute from "./icon-route.svg?inline";
import RoutingRuleResultSelector from "./RoutingRuleResultSelector";
import TextButton from "components/TextButton";
import RoutingCondition from "components/routing/RoutingCondition";

import { Grid, Column } from "components/Grid";
import { RADIO } from "constants/answer-types";

const Box = styled.div`
  border: 1px solid ${colors.bordersLight};
  border-radius: ${radius};
  margin-bottom: 2em;
  position: relative;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1em;
`;

const Title = styled.h2`
  position: absolute;
  margin: 0;
  top: 1.5em;
  left: 1.7em;
  letter-spacing: 0.05em;
  font-size: 0.9em;
  font-weight: bold;
  text-transform: uppercase;
`;

const CenteringColumn = styled(Column)`
  display: flex;
  justify-content: center;
  padding: 0.25em 0;
  margin-bottom: 0.5em;
`;

const RoutingRule = ({
  rule,
  onDeleteRule,
  onThenChange,
  onAddRoutingCondition,
  onUpdateRoutingConditionValue,
  onUpdateRoutingCondition,
  onDeleteRoutingCondition,
  title,
  destinations,
  pagesAvailableForRouting,
  className,
  ...otherProps
}) => {
  const { conditions, id, goto } = rule;

  const existingRadioConditions = {};

  const handleDeleteClick = () => onDeleteRule(rule);
  const handleAddClick = () => onAddRoutingCondition(rule);
  const handleThenChange = value => onThenChange({ id: id, goto: value });

  return (
    <div className={className} data-test="routing-rule">
      <Box>
        {title && <Title>{title}</Title>}
        <Buttons>
          <Button
            onClick={handleDeleteClick}
            data-test="btn-delete"
            variant="tertiary"
            small
          >
            <IconText icon={IconRoute}>Remove rule</IconText>
          </Button>
        </Buttons>
        <div>
          <TransitionGroup>
            {conditions.map((condition, index) => {
              const { answer } = condition;

              const component = (
                <Transition key={condition.id}>
                  <div>
                    <RoutingCondition
                      condition={condition}
                      label={index > 0 ? "AND" : "IF"}
                      ruleId={id}
                      sections={pagesAvailableForRouting}
                      onRemove={
                        conditions.length > 1 ? onDeleteRoutingCondition : null
                      }
                      onPageChange={onUpdateRoutingCondition}
                      onConditionValueChange={onUpdateRoutingConditionValue}
                      canAddAndCondition={!existingRadioConditions[answer.id]}
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
          <Grid align="center">
            <CenteringColumn gutters={false} cols={1}>
              <TextButton onClick={handleAddClick} data-test="btn-add">
                AND
              </TextButton>
            </CenteringColumn>
          </Grid>
        </div>
        <RoutingRuleResultSelector
          id="then"
          label="THEN"
          destinations={destinations}
          onChange={handleThenChange}
          value={goto}
          data-test="select-then"
        />
      </Box>
    </div>
  );
};

RoutingRule.propTypes = {
  rule: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.node,
  onDeleteRule: PropTypes.func.isRequired,
  onAddRoutingCondition: PropTypes.func.isRequired,
  onUpdateRoutingConditionValue: PropTypes.func.isRequired,
  onUpdateRoutingCondition: PropTypes.func.isRequired,
  onDeleteRoutingCondition: PropTypes.func,
  onThenChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  destinations: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  pagesAvailableForRouting: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  className: PropTypes.string
};

export default RoutingRule;
