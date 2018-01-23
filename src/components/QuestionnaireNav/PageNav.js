import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { getLink } from "utils/UrlUtils";
import Tooltip from "components/Tooltip";
import CustomPropTypes from "custom-prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { NavLink } from "react-router-dom";
import getTextFromHTML from "utils/getTextFromHTML";
import HoverDeleteButton from "./HoverDeleteButton";
import pageIcon from "./icon-questionpage.svg";
import { transparentize } from "polished";
const duration = 300;

const textInverted = "#E1E1E1";
const navHighlighted = "#008DD0";

export const StyledPageItem = styled.li`
  padding: 0;
  margin: 0;
  font-weight: 500;
  z-index: ${props => props.index};
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
  padding: 0.4em 2.5em 0.4em 1em;
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
    margin-right: 0.6em;
    opacity: 1;
    content: url(${pageIcon});
    transition: all 200ms ease-out;
    z-index: 1;
  }

  /* stylelint-disable */

  ${StyledPageItem}:hover &:not(.selected) {
    background: ${transparentize(0.5, navHighlighted)};
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

export const DeleteButton = styled(HoverDeleteButton)`
  top: 0;
  /* stylelint-disable */
  ${StyledPageItem}:hover &,
  ${Link}:focus + &,
  &:focus {
    opacity: 1;
    transform: translateX(0);
  }
  /* stylelint-enable */
`;

export class PageNavItem extends React.Component {
  state = {
    isDeleting: false
  };

  static propTypes = {
    sectionId: PropTypes.string.isRequired,
    questionnaireId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    pageNumber: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
  };

  handleDelete = () => {
    const { sectionId, pageId, onDelete } = this.props;

    this.setState({ isDeleting: true });

    onDelete(sectionId, pageId).catch(() => {
      this.setState({ isDeleting: false });
    });
  };

  handleFocus = _ => {
    document.querySelector('[class*="NavigationScrollPane"]').scrollLeft = 0;
  };

  render() {
    const { sectionId, questionnaireId, pageId, title, index } = this.props;

    return (
      <StyledPageItem index={index}>
        <Link
          to={getLink(questionnaireId, sectionId, pageId)}
          aria-disabled={parseInt(pageId, 10) < 0}
          activeClassName="selected"
        >
          <LinkText fade={this.state.isDeleting}>
            {getTextFromHTML(title) || "Page Title"}
          </LinkText>
        </Link>
        <Tooltip content="Delete page">
          <DeleteButton
            type="button"
            aria-label="Delete page"
            onClick={this.handleDelete}
            onFocus={this.handleFocus}
          >
            ×
          </DeleteButton>
        </Tooltip>
      </StyledPageItem>
    );
  }
}

const PageNav = ({ section, questionnaire, onDelete }) => (
  <TransitionGroup component={NavList}>
    {section.pages.map((page, i, pages) => {
      const pageNumber = `${section.number}.${i + 1}`;
      return (
        <CSSTransition key={page.id} timeout={duration} classNames="page">
          <PageNavItem
            title={page.title}
            pageNumber={pageNumber}
            pageId={page.id}
            sectionId={section.id}
            questionnaireId={questionnaire.id}
            onDelete={onDelete}
            index={pages.length - i}
          />
        </CSSTransition>
      );
    })}
  </TransitionGroup>
);

PageNav.propTypes = {
  questionnaire: CustomPropTypes.questionnaire.isRequired,
  section: CustomPropTypes.section.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default PageNav;
