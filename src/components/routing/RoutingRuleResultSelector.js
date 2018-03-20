import React from "react";
import styled, { css } from "styled-components";

import Select from "components/Forms/Select";
import { Grid, Column } from "components/Grid";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";

const disabled = css`
  opacity: 0.5;
  pointer-events: none;
  transition: opacity 500ms ease-in;
`;

const RoutingRuleResult = styled.div`
  padding: 1em;
  ${props => props.disabled && disabled};
`;

const Label = styled.label`
  width: 100%;
  display: block;
  font-size: 0.85em;
  font-weight: 600;
`;

const Goto = styled.span`
  float: right;
  margin-right: 1em;
`;

const RoutingRuleResultSelector = ({
  onChange,
  sections,
  label,
  id,
  disabled
}) => (
  <RoutingRuleResult disabled={disabled}>
    <Grid align="center">
      <Column gutters={false} cols={5}>
        <Label htmlFor={id}>
          {label} <Goto>Go to: </Goto>
        </Label>
      </Column>
      <Column gutters={false} cols={7}>
        <Select id={id} onChange={onChange} disabled={disabled}>
          {sections.map(section => (
            <optgroup label={section.title} key={section.id}>
              {section.pages.map(page => (
                <option value={page.id} key={page.id} disabled={page.disabled}>
                  {page.title}
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
  sections: PropTypes.arrayOf(CustomPropTypes.section).isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired
};

RoutingRuleResultSelector.defaultProps = {
  disabled: false
};

export default RoutingRuleResultSelector;
