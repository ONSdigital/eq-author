import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { getLink } from "utils/UrlUtils";
import CustomPropTypes from "custom-prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { NavLink } from "react-router-dom";
import getTextFromHTML from "utils/getTextFromHTML";
import pageIcon from "./icon-questionpage.svg";
import { rgba } from "polished";
const duration = 300;

const textInverted = "#E1E1E1";
const navHighlighted = "#008DD0";

export const StyledPageItem = styled.li`
  padding: 0;
  margin: 0;
  font-weight: 500;
  position: relative;
  display: flex;
  align-items: center;

  &.page-enter,
  &.page-exit.page-exit-active {
    opacity: 0;
    height: 0;
    transform: translateX(-20px);
  }

  &.page-exit,
  &.page-enter.page-enter-active {
    opacity: 1;
    height: 2em;
    transform: translateX(0);
  }

  &.page-enter-active {
    transition: height ${duration / 2}ms ease-out,
      opacity ${duration / 2}ms ease-out ${duration / 2}ms,
      transform ${duration / 2}ms ease-out ${duration / 2}ms;
  }

  &.page-exit-active {
    transition: opacity ${duration / 2}ms ease-out,
      transform ${duration / 2}ms ease-out,
      height ${duration / 2}ms ease-out ${duration / 2}ms;
  }
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: ${textInverted};
  padding: 0.4em 2.5em 0.4em 0.6em;
  flex: 1 1 auto;
  height: 100%;
  position: relative;
  overflow: hidden;
  transition: opacity 100ms ease-out;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  &::before {
    flex: 0;
    margin-right: 0.3em;
    opacity: 1;
    content: url(${pageIcon});
    transition: all 200ms ease-out;
    z-index: 1;
  }

  /* stylelint-disable declaration-block-semicolon-newline-after */
  ${StyledPageItem}:hover &:not(.selected) {
    background: ${rgba(navHighlighted, 0.5)};
  }
  /* stylelint-enable */

  &.selected {
    background: ${navHighlighted};
    color: white;
  }

  &[aria-disabled="true"] {
    pointer-events: none;
    opacity: 0.5;
  }
`;

export const LinkText = styled.span`
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  position: relative;
  z-index: 2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: ${({ fade }) => (fade ? 0.5 : 1)};
  font-size: 0.75em;
`;

const NavList = styled.ol`
  padding: 0;
  margin: 0;
  list-style: none;
`;

export class PageNavItem extends React.Component {
  state = {
    isDeleting: false
  };

  static propTypes = {
    sectionId: PropTypes.string.isRequired,
    questionnaireId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  };

  render() {
    const { sectionId, questionnaireId, pageId, title } = this.props;

    return (
      <StyledPageItem data-test="page-item">
        <Link
          to={getLink(questionnaireId, sectionId, pageId)}
          aria-disabled={parseInt(pageId, 10) < 0}
          activeClassName="selected"
        >
          <LinkText fade={this.state.isDeleting}>
            {getTextFromHTML(title) || "Page Title"}
          </LinkText>
        </Link>
      </StyledPageItem>
    );
  }
}

const PageNav = ({ section, questionnaire }) => (
  <TransitionGroup component={NavList}>
    {section.pages.map(page => {
      return (
        <CSSTransition key={page.id} timeout={duration} classNames="page">
          <PageNavItem
            title={page.title}
            pageId={page.id}
            sectionId={section.id}
            questionnaireId={questionnaire.id}
          />
        </CSSTransition>
      );
    })}
  </TransitionGroup>
);

PageNav.propTypes = {
  questionnaire: CustomPropTypes.questionnaire.isRequired,
  section: CustomPropTypes.section.isRequired
};

export default PageNav;
