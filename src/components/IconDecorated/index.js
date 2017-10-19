/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import Tooltip from "components/Tooltip/index";
import VisuallyHidden from "components/VisuallyHidden/index";

const IconDecorated = ({
  icon,
  title,
  disabled,
  handleClick,
  component: Component,
  ...otherProps
}) => (
  <Tooltip content={title}>
    <div>
      <Component
        onClick={handleClick}
        disabled={disabled}
        icon={icon}
        {...otherProps}
      >
        <VisuallyHidden>{title}</VisuallyHidden>
      </Component>
    </div>
  </Tooltip>
);

IconDecorated.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  handleClick: PropTypes.func,
  className: PropTypes.string,
  component: PropTypes.any.isRequired
};

export default IconDecorated;
