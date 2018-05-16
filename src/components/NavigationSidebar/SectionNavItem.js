import React from "react";
import styled from "styled-components";

import PageNav from "components/NavigationSidebar/PageNav";
import NavLink from "./NavLink";
import CustomPropTypes from "custom-prop-types";
import { getLink } from "utils/UrlUtils";
import getTextFromHTML from "utils/getTextFromHTML";
import SectionIcon from "./icon-section.svg?inline";

const StyledSectionNavItem = styled.li`
  display: block;
`;

class SectionNavItem extends React.Component {
  static propTypes = {
    questionnaire: CustomPropTypes.questionnaire,
    section: CustomPropTypes.section.isRequired
  };

  render() {
    const { questionnaire, section, ...otherProps } = this.props;

    return (
      <StyledSectionNavItem data-test="section-item" {...otherProps}>
        <NavLink
          exact
          to={getLink(questionnaire.id, section.id)}
          data-test="nav-section-link"
          title={getTextFromHTML(section.title)}
          icon={SectionIcon}
        >
          {getTextFromHTML(section.title) || "Section Title"}
        </NavLink>

        <PageNav section={section} questionnaire={questionnaire} />
      </StyledSectionNavItem>
    );
  }
}

export default SectionNavItem;
