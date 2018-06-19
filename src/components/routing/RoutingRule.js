import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";

import Button from "components/Button";
import IconText from "components/IconText";
import { colors, radius } from "constants/theme";
import IconRoute from "./icon-route.svg?inline";
import RoutingRuleResultSelector from "./RoutingRuleResultSelector";
import TextButton from "components/TextButton";
import { Grid, Column } from "components/Grid";

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
  children,
  onDeleteRule,
  onThenChange,
  onAddRoutingCondition,
  title,
  routingOptions,
  canRoute,
  rule,
  className
}) => {
  return (
    <div className={className}>
      <Box>
        {title && <Title>{title}</Title>}
        <Buttons>
          <Button
            onClick={() => onDeleteRule(rule)}
            data-test="btn-delete"
            disabled={!children}
            variant="tertiary"
            small
          >
            <IconText icon={IconRoute}>Remove rule</IconText>
          </Button>
        </Buttons>
        <div>
          {children}
          {canRoute && (
            <Grid align="center">
              <CenteringColumn gutters={false} cols={1}>
                <TextButton
                  onClick={() => onAddRoutingCondition(rule)}
                  data-test="btn-add"
                >
                  AND
                </TextButton>
              </CenteringColumn>
            </Grid>
          )}
        </div>
        <RoutingRuleResultSelector
          id="then"
          label="THEN"
          routingOptions={routingOptions}
          onChange={value => onThenChange({ id: rule.id, goto: value })}
          value={rule.goto}
          data-test="select-then"
          disabled={!canRoute}
        />
      </Box>
    </div>
  );
};

RoutingRule.propTypes = {
  rule: PropTypes.object.isRequired,
  children: PropTypes.node,
  onDeleteRule: PropTypes.func.isRequired,
  onAddRoutingCondition: PropTypes.func.isRequired,
  onThenChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  routingOptions: PropTypes.object.isRequired,
  canRoute: PropTypes.bool.isRequired,
  className: PropTypes.string
};

RoutingRule.defaultProps = {
  canRoute: true
};

export default RoutingRule;
