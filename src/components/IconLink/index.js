import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Tooltip from "components/Tooltip";
import VisuallyHidden from "components/VisuallyHidden";

export const StyledLink = styled.a`
  display: flex;
  align-items: center;
  padding: 0.5em;
  cursor: pointer;
  background: transparent;
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

const IconLink = ({
  href,
  icon,
  title,
  disabled,
  handleClick,
  ...otherProps
}) => (
  <Tooltip content={title}>
    <div>
      <StyledLink
        href={href}
        onClick={handleClick}
        disabled={disabled}
        icon={icon}
        {...otherProps}
      >
        <VisuallyHidden>{title}</VisuallyHidden>
      </StyledLink>
    </div>
  </Tooltip>
);

IconLink.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  handleClick: PropTypes.func,
  className: PropTypes.string
};

export default IconLink;
