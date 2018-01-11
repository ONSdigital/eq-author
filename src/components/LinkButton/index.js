import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import Button from "components/Button";
import { withRouter } from "react-router-dom";

export const LB = ({ history, to, ...otherProps }) => (
  <Button
    {...otherProps}
    type="button"
    onClick={() => history.push(to)} // eslint-disable-line
  />
);

LB.propTypes = {
  to: PropTypes.string.isRequired,
  history: CustomPropTypes.history.isRequired
};

export default withRouter(LB);
