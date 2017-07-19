import React from "react";
import PropTypes from "prop-types";
import { Transition } from "react-transition-group";

const FadeTransition = ({
  children,
  component: Component,
  duration,
  ...otherProps
}) =>
  <Transition timeout={duration} {...otherProps}>
    {state =>
      <Component state={state}>
        {children}
      </Component>}
  </Transition>;

FadeTransition.propTypes = {
  children: PropTypes.node.isRequired,
  component: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  duration: PropTypes.number.isRequired
};

export default FadeTransition;
