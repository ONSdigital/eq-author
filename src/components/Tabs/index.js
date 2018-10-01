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

  &[aria-current="true"] {
    background: ${colors.white};
    color: ${colors.secondary};
    border: 1px solid ${colors.bordersLight};
    border-bottom: none;
  }

  &:focus {
    outline: 3px solid ${colors.orange};
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

export const UnwrappedTabs = ({ match, children }) => {
  const { pageId } = match.params;

  const url = pageId
    ? buildPagePath(match.params)
    : buildSectionPath(match.params);

  return (
    <div>
      <TabsContainer data-test="tabs-nav">
        <Tab to={url}>Design</Tab>
        {pageId ? (
          <Fragment>
            <Tab to={buildPreviewPath(match.params)}>Preview</Tab>
            <Tab to={buildRoutingPath(match.params)}>Routing</Tab>
          </Fragment>
        ) : (
          <Fragment>
            <DisabledTab>Preview</DisabledTab>
            <DisabledTab>Routing</DisabledTab>
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

export default withRouter(UnwrappedTabs);
