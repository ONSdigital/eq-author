import React from "react";
import styled from "styled-components";

import DeleteButton from "components/DeleteButton";
import IconClose from "./icon-close.svg?inline";
import { PropTypes } from "prop-types";
import CustomPropTypes from "custom-prop-types";

import { Grid, Column } from "components/Grid";

import svgPath from "./path.svg";
import svgPathEnd from "./path-end.svg";
import IconText from "components/IconText";
import { get } from "lodash";
import GroupedSelect from "./GroupedSelect";

const Label = styled.label`
  width: 100%;
  display: inline-block;
  font-size: 0.9em;
  letter-spacing: 0.05em;
  font-weight: bold;
  text-align: center;
  align-self: center;
`;

export const PageSelect = styled(GroupedSelect)`
  margin: 0;
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

const RemoveButton = styled(DeleteButton)`
  display: block;
  margin: auto;
  position: relative;
  right: 2px;
`;

const convertToGroups = sections =>
  sections.map(section => ({
    label: section.plaintextTitle || "Section Title",
    options: section.pages.map(page => ({
      label: page.plaintextTitle || "Page Title",
      value: page.id,
      disabled: page.disabled
    }))
  }));

const RoutingCondition = ({
  condition,
  ruleId,
  sections,
  id,
  label,
  pathEnd,
  onPageChange,
  onRemove,
  canRemove,
  children
}) => (
  <div>
    <Grid align="center">
      <Column gutters={false} cols={1}>
        <Label htmlFor={id}>{label}</Label>
      </Column>
      <Column gutters={false} cols={10}>
        <PageSelect
          value={get(condition, "questionPage.id")}
          onChange={({ value }) =>
            onPageChange({ id: condition.id, questionPageId: value })}
          groups={convertToGroups(sections)}
          id={id}
        />
      </Column>
      <Column gutters={false} cols={1}>
        <RemoveButton
          onClick={() => onRemove(ruleId, condition.id)}
          disabled={!canRemove}
          data-test="btn-remove"
        >
          <IconText icon={IconClose} hideText>
            Remove
          </IconText>
        </RemoveButton>
      </Column>
    </Grid>
    <Grid>
      <Column gutters={false} cols={1}>
        <ConnectedPath pathEnd={pathEnd} />
      </Column>
      <Column gutters={false} cols={10}>
        {children}
      </Column>
      <Column cols={1} />
    </Grid>
  </div>
);

RoutingCondition.propTypes = {
  sections: PropTypes.arrayOf(CustomPropTypes.section).isRequired,
  value: PropTypes.string,
  selectedPage: CustomPropTypes.page.isRequired,
  id: PropTypes.string.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
  children: PropTypes.node.isRequired,
  label: PropTypes.oneOf(["IF", "AND"]).isRequired,
  pathEnd: PropTypes.bool.isRequired
};

RoutingCondition.defaultProps = {
  pathEnd: false,
  label: "IF"
};

export default RoutingCondition;
