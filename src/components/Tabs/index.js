import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";
import { colors, radius } from "constants/theme";
import {
  buildPagePath,
  buildSectionPath,
  buildRoutingPath
} from "utils/UrlUtils";

import CustomPropTypes from "custom-prop-types";

import { connect } from "react-redux";

import { size } from "lodash";
import { compose } from "redux";

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
  font-size: 1em;
  font-weight: bold;
  color: ${colors.white};
  padding: 0.3em 1.5em;
  border: 1px solid ${colors.secondary};
  border-bottom: none;
  background-color: ${colors.secondary};
  text-decoration: none;
  border-radius: ${radius} ${radius} 0 0;
  margin: 0 0.25em 0 0;
  position: relative;

  /* ${props =>
    props.hasErrors &&
    css`
      background: ${colors.red};
      border-color: ${colors.red};

      .${Badge} {
        background-color: white;
        color: white;
      }
    `}; */

  &.${activeClassName} {
    background: ${colors.white};
    color: ${colors.secondary};
    border: 1px solid ${colors.bordersLight};
    border-bottom: none;
  }
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

  return (
    <div>
      <TabsContainer data-test="tabs-nav">
        <Tab to={url} activeClassName={activeClassName} hasErrors={errors > 0}>
          <span>Design</span>
          {errors > 0 && <Badge>Errors: {errors}</Badge>}
        </Tab>
        {pageId ? (
          <Tab
            to={buildRoutingPath(match.params)}
            activeClassName={activeClassName}
          >
            Routing
          </Tab>
        ) : (
          <DisabledTab>Routing</DisabledTab>
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
    errors: size(state.fieldValidation[ownProps.match.params.pageId])
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps)
)(UnwrappedTabs);
