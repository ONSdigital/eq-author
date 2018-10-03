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

import IconPreview from "./icon-preview.svg?inline";
import IconDesign from "./icon-design.svg?inline";
import IconRouting from "./icon-route.svg?inline";
import IconText from "components/IconText";

export const TabsContainer = styled.nav`
  display: flex;
  justify-content: center;
  padding: 0;
  position: relative;
  bottom: -1px;
`;

const Tab = styled(NavLink)`
  --color-text: ${colors.white};
  font-size: 1em;
  font-weight: bold;
  color: var(--color-text);
  padding: 0 0.4em 0 0.2em;
  border: 1px solid ${colors.secondary};
  border-bottom: none;
  background-color: ${colors.secondary};
  text-decoration: none;
  border-radius: ${radius} ${radius} 0 0;
  margin: 0 0.25em 0 0;

  &[aria-current="true"] {
    background: ${colors.white};
    --color-text: ${colors.secondary};
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

  const preview = <IconText icon={IconPreview}>Preview</IconText>;
  const routing = <IconText icon={IconRouting}>Routing</IconText>;
  const design = <IconText icon={IconDesign}>Design</IconText>;

  return (
    <div>
      <TabsContainer data-test="tabs-nav">
        <Tab to={url}>{design}</Tab>
        {pageId ? (
          <Fragment>
            <Tab to={buildPreviewPath(match.params)}>{preview}</Tab>
            <Tab to={buildRoutingPath(match.params)}>{routing}</Tab>
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

export default withRouter(UnwrappedTabs);
