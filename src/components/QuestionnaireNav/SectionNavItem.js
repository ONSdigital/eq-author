import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";

import styled from "styled-components";

import { CSSTransition } from "react-transition-group";

const ListItem = styled.li`
  margin: 0;
  padding: 0.5em 0;
  transition: height ${props => props.duration / 2}ms ease-out,
    opacity ${props => props.duration}ms ease-out ${props => props.duration}ms,
    padding ${props => props.duration}ms ease-out,
    transform ${props => props.duration}ms ease-out ${props => props.duration}ms;
  opacity: 1;
  transform: translateX(0);

  &:not(:last-child) {
    border-bottom: 1px solid #c3c3c3;
  }

  &.section-enter {
    opacity: 0;
    height: 0;
    padding: 0;
    transform: translateX(-20px);
  }

  &.section-entered {
    height: auto;
  }
`;

const SectionNavItem = ({
  children,
  section,
  saveSectionItemRef,
  duration,
  ...props
}) => (
  <CSSTransition timeout={duration} classNames="section">
    <ListItem
      innerRef={function(node) {
        saveSectionItemRef(section.id, node);
      }}
    >
      {children}
    </ListItem>
  </CSSTransition>
);

SectionNavItem.propTypes = {
  children: PropTypes.node.isRequired,
  section: CustomPropTypes.section.isRequired,
  saveSectionItemRef: PropTypes.func.isRequired
};

export default SectionNavItem;
