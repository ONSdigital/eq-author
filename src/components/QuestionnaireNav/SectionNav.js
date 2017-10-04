import React, { Component } from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";

import styled from "styled-components";
import { colors } from "constants/theme";

import sectionIcon from "./icon-section.svg";

import PageNav from "components/QuestionnaireNav/PageNav";
import SectionNavItem from "components/QuestionnaireNav/SectionNavItem";
import { TransitionGroup } from "react-transition-group";

import { NavLink } from "react-router-dom";

import { first, delay } from "lodash";
import { getLink } from "utils/UrlUtils";

const Link = styled(NavLink)`
  text-decoration: none;
  &:link,
  &:visited {
    color: ${colors.text};
  }
`;

const SectionTitle = styled.h3`
  padding: 0.5em 0;
  font-size: 0.75em;
  margin: 0;
  font-weight: 900;
  display: flex;
  &:before {
    content: url(${sectionIcon});
    margin-right: 0.5em;
  }
`;

export const AddPageBtn = styled.button`
  appearance: none;
  cursor: pointer;
  background: none;
  border: none;
  padding: 1em;
  color: ${colors.text};
  &:hover {
    color: black;
  }
`;

const NavList = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const LinkedSectionTitle = ({ questionnaire, section }) => {
  const sectionTitle = (
    <SectionTitle>{section.title || "Section Title"}</SectionTitle>
  );
  if (section.pages.length > 0) {
    const firstPage = first(section.pages);
    return (
      <Link
        to={getLink(questionnaire.id, section.id, firstPage.id)}
        aria-disabled={parseInt(firstPage.id, 10) < 0}
        activeClassName="selected"
      >
        {sectionTitle}
      </Link>
    );
  } else {
    return sectionTitle;
  }
};

LinkedSectionTitle.propTypes = {
  questionnaire: CustomPropTypes.questionnaire.isRequired,
  section: CustomPropTypes.section.isRequired
};

class SectionNav extends Component {
  sectionItems = [];

  static propTypes = {
    questionnaire: CustomPropTypes.questionnaire,
    onAddPage: PropTypes.func.isRequired,
    onDeletePage: PropTypes.func.isRequired
  };

  scrollSectionIntoView = id => {
    delay(
      node => {
        node.scrollIntoView({ behavior: "smooth" });
      },
      200,
      this.sectionItems[id]
    );
  };

  saveSectionItemRef = (id, node) => {
    this.sectionItems[id] = node;
  };

  render() {
    const { questionnaire, onAddPage, onDeletePage } = this.props;
    return (
      <TransitionGroup component={NavList}>
        {questionnaire.sections
          .map((section, i) => ({
            ...section,
            number: `${i + 1}.`
          }))
          .map((section, sectionNum) => (
            <SectionNavItem
              key={section.number}
              section={section}
              saveSectionItemRef={this.saveSectionItemRef}
            >
              <LinkedSectionTitle
                questionnaire={questionnaire}
                section={section}
              />
              <PageNav
                section={section}
                questionnaire={questionnaire}
                onDelete={onDeletePage}
              />
              <AddPageBtn
                onClick={function() {
                  onAddPage(section.id);
                }}
                id="btn-add-page"
              >
                + Add page
              </AddPageBtn>
            </SectionNavItem>
          ))}
      </TransitionGroup>
    );
  }
}

export default SectionNav;
