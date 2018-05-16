import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";
import { colors, radius } from "constants/theme";
import { getLink } from "utils/UrlUtils";

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
  color: ${colors.lightGrey};
  padding: 0.3em 2em;
  border: 1px solid #666;
  border-bottom: none;
  background-color: #666;
  text-decoration: none;
  border-radius: ${radius} ${radius} 0 0;
  margin: 0 0.25em 0 0;

  &[aria-current="true"] {
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

const DisabledTab = Tab.withComponent("span");

export const UnwrappedTabs = ({ match, children }) => {
  return (
    <div>
      <TabsContainer>
        <Tab
          to={getLink(
            match.params.questionnaireId,
            match.params.sectionId,
            match.params.pageId
          )}
          activeClassName="selected"
        >
          Builder
        </Tab>
        <DisabledTab>Routing</DisabledTab>
      </TabsContainer>
      <TabsBody>{children}</TabsBody>
    </div>
  );
};

UnwrappedTabs.propTypes = {
  questionnaire: CustomPropTypes.questionnaire,
  section: CustomPropTypes.section,
  page: CustomPropTypes.page,
  match: CustomPropTypes.match,
  children: PropTypes.node.isRequired
};

export default withRouter(UnwrappedTabs);
