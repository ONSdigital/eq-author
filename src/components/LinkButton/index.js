import React from "react";
import Button from "components/Button";
import { withRouter } from "react-router-dom";

const LinkButton = withRouter(({ history, to, children, ...otherProps }) =>
  <Button
    {...otherProps}
    type="button"
    onClick={() => history.push(to)} // eslint-disable-line
  >
    {children}
  </Button>
);

export default LinkButton;
