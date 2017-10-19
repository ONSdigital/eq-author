import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import IconDecorated from "components/IconDecorated";

export const StyledLink = styled.a`
  display: flex;
  align-items: center;
  padding: 0.5em;
  cursor: pointer;
  appearance: none;
  border: none;
  opacity: 0.9;
  transition: opacity 200ms ease-out;
  background: transparent url(${props => props.icon}) no-repeat center;
  width: 3.5em;
  height: 3.5em;

  &:hover {
    opacity: 1;
  }

  &[disabled] {
    opacity: 0.5;
  }
`;

const IconLink = props => <IconDecorated {...props} component={StyledLink} />;

IconLink.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  handleClick: PropTypes.func,
  className: PropTypes.string
};

export default IconLink;
