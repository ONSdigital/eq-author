import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { getLink } from "utils/UrlUtils";

import NavLink from "./NavLink";
import getTextFromHTML from "utils/getTextFromHTML";
import PageIcon from "./icon-questionpage.svg?inline";

export const StyledPageItem = styled.li`
  padding: 0;
  margin: 0;
  position: relative;
  display: flex;
  align-items: center;
`;

const PageNavItem = ({
  sectionId,
  questionnaireId,
  pageId,
  title,
  ...otherProps
}) => (
  <StyledPageItem data-test="page-item" {...otherProps}>
    <NavLink
      to={getLink(questionnaireId, sectionId, pageId)}
      title={getTextFromHTML(title)}
      icon={PageIcon}
      data-test="nav-page-link"
    >
      {getTextFromHTML(title) || "Page Title"}
    </NavLink>
  </StyledPageItem>
);

PageNavItem.propTypes = {
  sectionId: PropTypes.string.isRequired,
  questionnaireId: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default PageNavItem;
