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

export const TabsContainer = styled.nav`
  display: flex;
  justify-content: center;
  padding: 0;
  position: relative;
  bottom: -1px;
`;

const Tab = styled(NavLink)`
  font-size: 1em;
  font-weight: bold;
  color: ${colors.white};
  padding: 0.3em 2em;
  border: 1px solid ${colors.secondary};
  border-bottom: none;
  background-color: ${colors.secondary};
  text-decoration: none;
  border-radius: ${radius} ${radius} 0 0;
  margin: 0 0.25em 0 0;

  &[aria-current="page"] {
    background: ${colors.white};
    color: ${colors.secondary};
    border: 1px solid ${colors.bordersLight};
    border-bottom: none;
  }
`;

const hasBorderCSS = css`
  background: ${colors.white};
  border: 1px solid ${colors.bordersLight};
  border-radius: ${radius};
`;

const TabsBody = styled.div`
  ${props => props.hasBorder && hasBorderCSS};
`;

const DisabledTab = styled(Tab.withComponent("span"))`
  opacity: 0.5;
  color: ${colors.lightGrey};
`;

export const UnwrappedTabs = ({ match, children }) => {
  const { pageId } = match.params;

  const url = pageId
    ? buildPagePath(match.params)
    : buildSectionPath(match.params);

  return (
    <div>
      <TabsContainer data-test="tabs-nav">
        <Tab to={url}>Builder</Tab>
        {pageId ? (
          <Tab activeClassName="selected" to={buildRoutingPath(match.params)}>
            Routing
          </Tab>
        ) : (
          <DisabledTab>Routing</DisabledTab>
        )}
      </TabsContainer>

      <TabsBody
        data-test="tabs-body"
        hasBorder={match.url.indexOf("routing") === -1}
      >
        {children}
      </TabsBody>
    </div>
  );
};

UnwrappedTabs.propTypes = {
  match: CustomPropTypes.match,
  children: PropTypes.node.isRequired
};

export default withRouter(UnwrappedTabs);
