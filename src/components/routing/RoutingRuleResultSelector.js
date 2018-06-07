import React from "react";
import styled from "styled-components";
import Select from "components/Forms/Select";
import { Grid, Column } from "components/Grid";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import { get } from "lodash";

const RoutingRuleResult = styled.div`
  padding: 1em;
`;

const Label = styled.label`
  width: 100%;
  display: block;
  font-size: 0.9em;
  font-weight: bold;
  &[disabled] {
    opacity: 0.5;
  }
`;

const Goto = styled.span`
  float: right;
  margin-right: 1em;
`;

const RoutingRuleResultSelector = ({
  onChange,
  routingOptions,
  label,
  id,
  value,
  disabled
}) => (
  <RoutingRuleResult key={id}>
    <Grid align="center">
      <Column gutters={false} cols={5}>
        <Label htmlFor={id} disabled={disabled}>
          {label} <Goto>Go to: </Goto>
        </Label>
      </Column>
      <Column gutters={false} cols={7}>
        <Select
          value={value}
          id={id}
          onChange={onChange}
          disabled={disabled}
          data-test="result-selector"
        >
          {routingOptions.map(routingOption => (
            <optgroup
              label={
                get(routingOption, "plaintextTitle", routingOption.title) ||
                "Section Title"
              }
              key={routingOption.id}
            >
              {routingOption.pages.map(page => (
                <option value={page.id} key={page.id} disabled={page.disabled}>
                  {get(page, "plaintextTitle", page.title) || "Page Title"}
                </option>
              ))}
            </optgroup>
          ))}
        </Select>
      </Column>
    </Grid>
  </RoutingRuleResult>
);

RoutingRuleResultSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  routingOptions: PropTypes.arrayOf(CustomPropTypes.section).isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool.isRequired
};

RoutingRuleResultSelector.defaultProps = {
  disabled: false
};

export default RoutingRuleResultSelector;
