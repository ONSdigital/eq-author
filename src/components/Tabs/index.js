import React, { Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";
import { colors, radius } from "constants/theme";
import {
  buildPagePath,
  buildSectionPath,
  buildRoutingPath,
  buildPreviewPath
} from "utils/UrlUtils";

import CustomPropTypes from "custom-prop-types";

import { connect } from "react-redux";

import { size } from "lodash";
import { compose } from "redux";
import IconPreview from "./icon-preview.svg?inline";
import IconDesign from "./icon-design.svg?inline";
import IconRouting from "./icon-route.svg?inline";
import IconText from "components/IconText";

export const activeClassName = "active";

const Badge = styled.span`
  position: absolute;
  right: 0.6em;
  top: 2px;
  bottom: 0;
  margin: auto;
  width: 10px;
  height: 10px;
  overflow: hidden;
  border-radius: 0.7em;
  border: 1px solid white;
  background-color: ${colors.red};
  color: ${colors.red};
  padding: 0;
  z-index: 2;
  line-height: 1;
  font-size: 0.9em;
  pointer-events: none;
`;

export const TabsContainer = styled.nav`
  display: flex;
  justify-content: center;
  padding: 0;
  position: relative;
  bottom: -1px;
`;

export const Tab = styled(NavLink)`
  --color-text: ${colors.white};
  font-size: 1em;
  font-weight: bold;
  color: var(--color-text);
  padding: 0 1.7em 0 0.7em;
  border: 1px solid ${colors.secondary};
  border-bottom: none;
  background-color: ${colors.secondary};
  text-decoration: none;
  border-radius: ${radius} ${radius} 0 0;
  margin: 0 0.25em 0 0;
  position: relative;

  &.${activeClassName} {
    background: ${colors.white};
    --color-text: ${colors.secondary};
    border: 1px solid ${colors.bordersLight};
    border-bottom: none;
  }

  &:focus {
    outline: 3px solid ${colors.orange};
  }
`;

const TabTitle = styled(IconText)`
  padding: 0;
`;

const TabsBody = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.bordersLight};
  border-radius: ${radius};
`;

const DisabledTab = styled(Tab.withComponent("span"))`
  opacity: 0.5;
  color: ${colors.lightGrey};
`;

export const UnwrappedTabs = props => {
  const { match, children, errors } = props;
  const { pageId } = match.params;

  const url = pageId
    ? buildPagePath(match.params)
    : buildSectionPath(match.params);

  const preview = <TabTitle icon={IconPreview}>Preview</TabTitle>;
  const routing = <TabTitle icon={IconRouting}>Routing</TabTitle>;
  const design = <TabTitle icon={IconDesign}>Design</TabTitle>;

  return (
    <div>
      <TabsContainer data-test="tabs-nav">
        <Tab to={url} activeClassName={activeClassName}>
          {design} {errors > 0 && <Badge>Errors: {errors}</Badge>}
        </Tab>
        {pageId ? (
          <Fragment>
            <Tab
              to={buildPreviewPath(match.params)}
              activeClassName={activeClassName}
            >
              {preview}
            </Tab>
            <Tab
              to={buildRoutingPath(match.params)}
              activeClassName={activeClassName}
            >
              {routing}
            </Tab>
          </Fragment>
        ) : (
          <Fragment>
            <DisabledTab>{preview}</DisabledTab>
            <DisabledTab>{routing}</DisabledTab>
          </Fragment>
        )}
      </TabsContainer>
      <TabsBody data-test="tabs-body">{children}</TabsBody>
    </div>
  );
};

UnwrappedTabs.propTypes = {
  match: CustomPropTypes.match,
  children: PropTypes.node.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    errors: size(state.fieldValidation.errors[ownProps.match.params.pageId])
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps)
)(UnwrappedTabs);
