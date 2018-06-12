import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { buildQuestionnairePath } from "utils/UrlUtils";
import NavLink from "./NavLink";
import getTextFromHTML from "utils/getTextFromHTML";
import PageIcon from "./icon-questionpage.svg?inline";
import { withRouter } from "react-router-dom";
import CustomPropTypes from "custom-prop-types";

const StyledPageItem = styled.li`
  padding: 0;
  margin: 0;
  position: relative;
  display: flex;
  align-items: center;
`;

export const UnwrappedPageNavItem = ({
  sectionId,
  questionnaireId,
  pageId,
  title,
  match,
  ...otherProps
}) => (
  <StyledPageItem data-test="page-item" {...otherProps}>
    <NavLink
      to={buildQuestionnairePath({
        questionnaireId,
        sectionId,
        pageId,
        tab: match.params.tab || "design"
      })}
      title={getTextFromHTML(title)}
      icon={PageIcon}
      data-test="nav-page-link"
    >
      {getTextFromHTML(title) || "Page Title"}
    </NavLink>
  </StyledPageItem>
);

UnwrappedPageNavItem.propTypes = {
  sectionId: PropTypes.string.isRequired,
  questionnaireId: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  match: CustomPropTypes.match
};

export default withRouter(UnwrappedPageNavItem);
