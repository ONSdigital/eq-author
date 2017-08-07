import React from "react";
import PropTypes from "prop-types";
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

  &.page-enter,
  &.page-exit {
    opacity: 0;
    height: 0;
    transform: translateX(-20px);
  }

  &.page-exit {
    transition: opacity ${duration / 2}ms ease-out,
      transform ${duration / 2}ms ease-out,
      height ${duration / 2}ms ease-out ${duration / 2}ms;
  }
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: ${colors.text};
  font-size: 0.75em;
  padding: 0.7em 2.5em 0.7em 0.9em;
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

  ${PageItem}:hover & {
    &::before {
      opacity: 0.5;
      width: 100%;
    }
  }

  &.selected {
    &::before {
      opacity: 1 !important;
      width: 100%;
    }
  }

  &[aria-disabled=true] {
    pointer-events: none;
    opacity: 0.5;
  }
`;

const LinkText = styled.span`
  display: inline-block;
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

const DeleteButton = styled.button`
  color: ${colors.text};
  border: none;
  background: transparent;
  font-size: 1.25em;
  margin-right: 0.25em;
  position: absolute;
  right: 0;
  top: 50%;
  z-index: 3;
  cursor: pointer;

  transform: translateY(-50%) translateX(50%);
  opacity: 0;
  transition: transform 0.1s ease-in, opacity 0.1s ease-in;

  ${PageItem}:hover &,
  ${Link}:focus + &,
  &:focus {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }
`;

const getLink = (questionnaireId, sectionId, pageId) =>
  `/questionnaire/${questionnaireId}/design/${sectionId}/${pageId}`;

const PageNav = ({ section, questionnaire, onDelete }) =>
  <TransitionGroup component={NavList}>
    {section.pages.map((page, i, pages) => {
      const pageNumber = `${section.number}${i + 1}`;
      return (
        <CSSTransition key={page.id} timeout={duration} classNames="page">
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
            {pages.length > 1 &&
              <DeleteButton
                type="button"
                onClick={() => onDelete(section.id, page.id)}
              >
                ×
              </DeleteButton>}
          </PageItem>
        </CSSTransition>
      );
    })}
  </TransitionGroup>;

PageNav.propTypes = {
  questionnaire: CustomPropTypes.questionnaire.isRequired,
  section: CustomPropTypes.section.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default PageNav;
