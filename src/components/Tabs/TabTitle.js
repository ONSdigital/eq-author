import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { colorBlue } from "constants/theme";

const SelectedTabTitle = css`
  border-bottom: none;
  border-color: rgba(5, 108, 153, 1);
  border-style: solid;
  border-width: 0 0 2px 0;
  div{
    color: ${colorBlue};
  }
`;

const UnselectedTabTitle = css`
  border-color: rgba(5, 108, 153, 0);
  border-style: solid;
  border-width: 0 0 2px 0;
`;

const CompactTabTitle = css`
  padding: 0.75em 1em;
  &:first-child {
    border-left: none !important;
  }
`;

const StyledTabTitle = styled.li`
  padding: 1em 2em;
  cursor: pointer;
  transition: border-color 200ms ease-in-out;
  &:hover {
    div{
      color: ${colorBlue};
    }
  }
  &[aria-selected=true] {
    ${SelectedTabTitle};
  }
  &[aria-selected=false] {
    ${UnselectedTabTitle};
  }

  ${props => props.compact && CompactTabTitle};
`;

const TabLabel = styled.div`
  font-size: 0.875em;
  font-weight: 600;
  user-select: none;
  transition: color 200ms ease-in-out;
`;

const TabTitle = ({ children, onClick, selected = true, ...otherProps }) => (
  <StyledTabTitle onClick={onClick} aria-selected={selected} {...otherProps}>
    <TabLabel>{children}</TabLabel>
  </StyledTabTitle>
);

TabTitle.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.bool
};

export default TabTitle;
