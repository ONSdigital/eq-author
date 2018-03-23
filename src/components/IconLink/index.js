import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Tooltip from "components/Tooltip/index";
import VisuallyHidden from "components/VisuallyHidden/index";

export const StyledLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  appearance: none;
  border: none;
  opacity: 0.9;
  transition: opacity 200ms ease-out;

  &:hover {
    opacity: 1;
  }

  &[disabled] {
    opacity: 0.5;
  }
`;

const IconLink = ({
  icon: Icon,
  title,
  disabled,
  handleClick,
  href,
  ...otherProps
}) => (
  <Tooltip content={title}>
    <div>
      <StyledLink
        href={href}
        onClick={handleClick}
        disabled={disabled}
        {...otherProps}
      >
        <Icon />
        <VisuallyHidden>{title}</VisuallyHidden>
      </StyledLink>
    </div>
  </Tooltip>
);
IconLink.propTypes = {
  icon: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  handleClick: PropTypes.func,
  className: PropTypes.string
};

export default IconLink;
