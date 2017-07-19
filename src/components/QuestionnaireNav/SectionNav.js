import React from "react";
import { TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";

import styled, { css } from "styled-components";
import { colors } from "constants/theme";

import sectionIcon from "./icon-section.svg";

import PageNav from "components/QuestionnaireNav/PageNav";
import FadeTransition from "components/QuestionnaireNav/FadeTransition";

const duration = 200;

const SectionItemEntering = css`
  opacity: 0;
  height: 0;
  padding: 0;
  transform: translateX(-20px);
`;

const SectionItem = styled.li`
  margin: 0;
  border-bottom: 1px solid #c3c3c3;
  padding: 0.5em 0;
  transition: height ${duration / 2}ms ease-out,
    opacity ${duration}ms ease-out ${duration}ms, padding ${duration}ms ease-out,
    transform ${duration}ms ease-out ${duration}ms;
  opacity: 1;
  transform: translateX(0);
  height: ${({ state }) => state === "entered" && "auto"};
  ${({ state }) => state === "entering" && SectionItemEntering};
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

const SectionNav = ({ questionnaire, onAddPageClick }) =>
  <TransitionGroup component={NavList}>
    {questionnaire.sections
      .map((section, i) => ({
        ...section,
        number: `${i + 1}.`
      }))
      .map((section, sectionNum) =>
        <FadeTransition
          key={section.number}
          component={SectionItem}
          duration={duration}
        >
          <SectionTitle>
            {section.title || "Section Title"}
          </SectionTitle>
          <PageNav section={section} questionnaire={questionnaire} />
          <AddPageBtn
            onClick={function() {
              onAddPageClick(section.id);
            }}
            id="btn-add-page"
          >
            + Add page
          </AddPageBtn>
        </FadeTransition>
      )}
  </TransitionGroup>;

SectionNav.propTypes = {
  questionnaire: CustomPropTypes.questionnaire,
  onAddPageClick: PropTypes.func.isRequired
};

export default SectionNav;
