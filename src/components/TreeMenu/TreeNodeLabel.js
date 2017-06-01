import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const SectionLabel = css`
  font-weight: 600;
`;

const QuestionLabel = css`
  font-weight: 600;
  font-size: 0.9em;
  padding-left: 1.5rem;
`;

const AnswerLabel = css`
  font-size: 0.8em;
  padding-left: 1.6rem;
`;

const StyledTreeNodeLabel = styled(NavLink)`
  display: block;
  color: white;
  text-decoration: none;
  padding: 0.5em 1em;
  padding-right: 2em;
  cursor: pointer;
  font-size: 0.9em;
  position: relative;

  &:nth-child(odd) {
    background-color: rgba(255, 255, 255, 0.02);
  }

  &:hover {
    background-color: rgba(97, 189, 224, 0.5);
  }

  &.active {
    background-color: rgba(97, 189, 224, 0.9);
    svg {
      filter: invert(100%);
    }
  }

  ${props => props.type === "sections" && SectionLabel}
  ${props => props.type === "questions" && QuestionLabel}
  ${props => props.type === "answers" && AnswerLabel}
`;

const TreeNodeLabel = ({ children, ...otherProps }) => (
  <StyledTreeNodeLabel {...otherProps}>
    {children}
  </StyledTreeNodeLabel>
);

TreeNodeLabel.defaultProps = {
  activeClassName: "active"
};

TreeNodeLabel.propTypes = {
  children: PropTypes.node
};

export default TreeNodeLabel;
