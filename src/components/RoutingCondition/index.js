import React from "react";
import Select from "components/Forms/Select";
import styled from "styled-components";

import IconButton from "components/IconButton";
import IconClose from "./icon-close.svg?inline";
import { PropTypes } from "prop-types";
import CustomPropTypes from "custom-prop-types";

import { Grid, Column } from "components/Grid";

import svgPath from "./path.svg";
import svgPathEnd from "./path-end.svg";

const Label = styled.label`
  width: 100%;
  display: inline-block;
  font-size: 0.9em;
  font-weight: 600;
  text-align: center;
  align-self: center;
`;

export const PageSelect = styled(Select)`
  margin: 0;
  align-self: center;
`;

export const RemoveButton = styled(IconButton)`
  margin: auto;
  align-self: center;
`;

const ConnectedPath = styled.div`
  position: relative;
  height: 100%;

  &::after {
    position: absolute;
    content: "";
    background: url(${({ pathEnd }) => (pathEnd ? svgPathEnd : svgPath)})
      no-repeat center center;
    background-size: auto;
    width: 100%;
    height: calc(100% - 2em);
    top: 0;
    bottom: 0;
    margin: auto;
  }
`;

const RoutingCondition = ({
  sections,
  value,
  selectedPage,
  id,
  pathEnd,
  onPageChange,
  onRemoveClick,
  children
}) => (
  <div>
    <Grid align="center">
      <Column gutters={false} cols={1.5}>
        <Label htmlFor={id}>IF</Label>
      </Column>
      <Column gutters={false} cols={9}>
        <PageSelect
          defaultValue={selectedPage.id}
          value={value}
          onChange={onPageChange}
          id={id}
        >
          {sections.map(section => (
            <optgroup label={section.title} key={section.id}>
              {section.pages.map(page => (
                <option value={page.id} key={page.id} disabled={page.disabled}>
                  {page.title}
                </option>
              ))}
            </optgroup>
          ))}
        </PageSelect>
      </Column>
      <Column gutters={false} cols={1.5}>
        <RemoveButton icon={IconClose} onClick={onRemoveClick} iconOnly>
          Remove
        </RemoveButton>
      </Column>
    </Grid>
    <Grid>
      <Column gutters={false} cols={1.5}>
        <ConnectedPath pathEnd={pathEnd} />
      </Column>
      <Column gutters={false} cols={9}>
        {children}
      </Column>
      <Column cols={1.5} />
    </Grid>
  </div>
);

RoutingCondition.propTypes = {
  sections: PropTypes.arrayOf(CustomPropTypes.section).isRequired,
  value: PropTypes.string,
  selectedPage: CustomPropTypes.page.isRequired,
  id: PropTypes.string.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  pathEnd: PropTypes.bool.isRequired
};

RoutingCondition.defaultProps = {
  pathEnd: false
};

export default RoutingCondition;
