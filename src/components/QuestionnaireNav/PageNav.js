import React from "react";
import styled from "styled-components";

import CustomPropTypes from "custom-prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { NavLink } from "react-router-dom";
import { colors } from "constants/theme";

const duration = 200;

const PageItem = styled.li`
  padding: 0;
  margin: 0;
  font-weight: 500;
  transition: height ${duration / 2}ms ease-out,
    opacity ${duration}ms ease-out ${duration}ms,
    transform ${duration}ms ease-out ${duration}ms;
  opacity: 1;
  height: 2em;
  transform: translateX(0);
  display: flex;
  align-items: center;
  &.page-enter {
    opacity: 0;
    height: 0;
    transform: translateX(-20px);
  }
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: ${colors.text};
  font-size: 0.75em;
  padding: 0.7em 0.9em;
  display: block;
  flex: 1 1 auto;
  height: 100%;
  position: relative;
  overflow: hidden;
  transition: opacity 100ms ease-out;
  &::before {
    opacity: 0;
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 0;
    transition: all 200ms ease-out;
    background: ${colors.borders};
    z-index: 1;
  }
  &:hover {
    &::before {
      opacity: 0.5;
      width: 100%;
    }
  }
  &.selected {
    &::before {
      opacity: 1;
      width: 100%;
    }
  }
  &[aria-disabled=true] {
    pointer-events: none;
    opacity: 0.5;
  }
`;

const LinkText = styled.span`
  width: 100%;
  position: relative;
  z-index: 2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NavList = styled.ol`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const getLink = (questionnaireId, sectionId, pageId) =>
  `/questionnaire/${questionnaireId}/design/${sectionId}/${pageId}`;

const PageNav = ({ section, questionnaire }) =>
  <TransitionGroup component={NavList}>
    {section.pages.map((page, i) => {
      const pageNumber = `${section.number}${i + 1}`;
      return (
        <CSSTransition key={pageNumber} timeout={duration} classNames="page">
          <PageItem>
            <Link
              to={getLink(questionnaire.id, section.id, page.id)}
              aria-disabled={page.id < 0}
              activeClassName="selected"
            >
              <LinkText>
                {pageNumber} {page.title || "Page Title"}
              </LinkText>
            </Link>
          </PageItem>
        </CSSTransition>
      );
    })}
  </TransitionGroup>;

PageNav.propTypes = {
  questionnaire: CustomPropTypes.questionnaire.isRequired,
  section: CustomPropTypes.section.isRequired
};

export default PageNav;
